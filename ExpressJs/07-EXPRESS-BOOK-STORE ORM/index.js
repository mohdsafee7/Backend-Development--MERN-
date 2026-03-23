require('dotenv/config');
const express = require('express');

const bookRouter = require('./routes/book.route');
const authorRouter = require('./routes/author.route');
const PORT = 8000;


const app = express();


//Middleware (plugins), Global Middlewares, run everytime
app.use(express.json()); 
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(PORT, ()=>{
  console.log(`Server is Running on ${PORT}`);
  
})