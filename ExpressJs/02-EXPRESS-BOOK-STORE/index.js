const { error } = require('console');
const express = require('express');
// const { log } = require('node:console');

const PORT = 8000;
const books = [
  {id : 1, title : "Pirates of the Carribean", author : "Jack Sparrow"},
  {id : 2, title : "In Search of Gold", author : "Mohd Safee"},
  {id : 3, title : "In Search of Diamond", author : "Mohd Faiz"},
  {id : 4, title : "In Search of Tamba", author : "Pappu Bhaiya"}
];

const app = express();


//Middleware (plugins)
app.use(express.json()); 

app.get('/books', (req,res)=>{
  // res.writeHead
  // res.end('text response');
  res.setHeader('x-safee', 'Mohd Safee');
  res.json(books); //key value pairs
});

//Dynamic Routing
app.get('/books/:id', (req,res)=>{
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({error : 'Id must be an Integer'});

  const book = books.find(e => e.id === id);

  if(!book)
    return res
      .status(404)
      .json({error : `Book with id: ${id} doesn't exist.`});
  
  return res.json(book);
});


app.post('/books', (req, res)=>{
  // console.log(req.headers);
  // console.log(req.body);
  const {title, author} = req.body;

  if(!title || title === '')
    return res.status(400).json({error : 'title is required'})

  if(!author || author === '')
    return res.status(400).json({error : 'author is required'})

  const id = books.length + 1;
  const book = {id, title, author};
  books.push(book);

  res.status(201).json({message : 'New book is created', id})
  
});

app.delete('/books/:id', (req, res)=>{
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({error : 'Id must be an Integer'});

  const idxToDelete = books.findIndex(e => e.id === id);

  if(idxToDelete === -1){
    return res
      .status(404)
      .json({error : `Book with id: ${id} doesn't exist.`});
  }

  books.splice(idxToDelete, 1);

  return res.status(200).json({message : 'Book Deleted.'})
})

app.listen(PORT, ()=>{
  console.log(`Server is Running on ${PORT}`);
  
})