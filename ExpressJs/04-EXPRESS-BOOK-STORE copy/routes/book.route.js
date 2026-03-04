const express = require('express');
const {BOOK} = require('../db/books')

const route = express.Router(); 


route.get('/', (req,res)=>{
  // res.end('text response');
  res.setHeader('x-safee', 'Mohd Safee');
  res.json(BOOK); //key value pairs
});



//Dynamic Routing
route.get('/:id', (req,res)=>{ //here customMiddleware -- route level middlware
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({error : 'Id must be an Integer'});

  const book = BOOK.find(e => e.id === id);

  if(!book)
    return res
      .status(404)
      .json({error : `Book with id: ${id} doesn't exist.`});
  
  return res.json(book);
});



route.post('/', (req, res)=>{
  // console.log(req.headers);
  // console.log(req.body);
  const {title, author} = req.body;

  if(!title || title === '')
    return res.status(400).json({error : 'title is required'})

  if(!author || author === '')
    return res.status(400).json({error : 'author is required'})

  const id = BOOK.length + 1;
  const book = {id, title, author};
  BOOK.push(book);

  res.status(201).json({message : 'New book is created', id})
  
});

route.delete('/:id', (req, res)=>{
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({error : 'Id must be an Integer'});

  const idxToDelete = BOOK.findIndex(e => e.id === id);

  if(idxToDelete === -1){
    return res
      .status(404)
      .json({error : `Book with id: ${id} doesn't exist.`});
  }

  BOOK.splice(idxToDelete, 1);

  return res.status(200).json({message : 'Book Deleted.'})
})



module.exports = route; //default export