/*
This controller handles CRUD operations for books using Drizzle ORM.
I created functions to fetch all books, fetch a book by ID, insert a new book, and delete a book.
Each function interacts with the PostgreSQL database through Drizzle queries and returns JSON responses with proper HTTP status codes."
*/


const { table } = require('console');
const {booksTable} = require('../models/book.schema');
const db = require('../src/index');
const { eq } = require('drizzle-orm');

exports.getAllBooks = async function(req,res){
  const books = await db.select().from(booksTable);
  return res.json(books);
}


exports.getBookById = async (req,res)=>{ //here customMiddleware -- route level middlware
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .limit(1)

  if(!book)
    return res
      .status(404)
      .json({error : `Book with id: ${id} doesn't exist.`});
  
  return res.json(book);
};

exports.createBook =async (req, res)=>{
  const {title, authorId, description} = req.body;

  if(!title || title === '')
    return res.status(400).json({error : 'title is required'})

  const [result] = await db
    .insert(booksTable).values({
      title,
      authorId,
      description,
    }).returning({
      id: booksTable.id,
    })

  res.status(201).json({message : 'New book is created', id: result.id})
  
}

exports.deleteBookById =async (req, res)=>{
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({message : 'Book Deleted.'})
};