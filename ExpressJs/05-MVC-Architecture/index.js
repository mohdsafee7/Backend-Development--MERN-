const express = require('express');

const bookRouter = require('./routes/book.route');
const {loggerMiddleware} = require('./middleware/logger');
const PORT = 8000;


const app = express();


//Middleware (plugins), Global Middlewares, run everytime
app.use(express.json()); 
app.use(loggerMiddleware); //custom middleware
app.use('/books', bookRouter);

app.listen(PORT, ()=>{
  console.log(`Server is Running on ${PORT}`);
  
})