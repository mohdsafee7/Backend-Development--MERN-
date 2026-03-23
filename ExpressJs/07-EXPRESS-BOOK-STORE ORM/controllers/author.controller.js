/*
This controller handles CRUD operations for authors using Drizzle ORM.
I created functions to fetch all authors, fetch an author by ID, insert a new author, and delete a author.
Each function interacts with the PostgreSQL database through Drizzle queries and returns JSON responses with proper HTTP status codes."
*/

const db = require('../src/index'); //database connection
const authorsTable = require('../models/author.schema');
const { sql, eq } = require('drizzle-orm');
const { booksTable } = require('../models/book.schema');

exports.getAllAuthors = async (req, res)=>{
  //adding query params
  const search = req.query.search;

  if(search){
     const [authors] = await db.select().from(authorsTable)
     .where(sql`to_tsvector('english', ${authorsTable.title}) @@ plainto_tsquery('english', ${search})`);

    return res.json(authors);
  }

  const authors = await db.select().from(authorsTable);
  return res.json(authors);
};


exports.getAuthorById = async (req, res)=>{
  const id = req.params.id;

  const [author] = await db.select().from(authorsTable)
  .where(eq(authorsTable.id, id))
  .limit(1)

  if(!author)
    return res
      .status(404)
      .json({error : `Author with id: ${id} doesn't exist.`});
  
  return res.json(author);
};

exports.createAuthor = async (req, res)=>{
  const {firstname, lastname, email} = req.body;

  if(!firstname || firstname === '')
    return res.status(400).json({error : 'firstname is required'})

  const [author] = await db
  .insert(authorsTable).values({
    firstname,
    lastname,
    email
    }).returning({
      id : authorsTable.id,
    })

    res.status(201).json({message : 'Author created successfully', authorId : author.id});

};

exports.getBooksByAuthorId = async(req, res)=>{
  const books = await db.select().from(booksTable)
  .where(eq(booksTable.authorId, req.params.id));

  return res.json(books);
}


