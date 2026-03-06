const express = require('express');
const controller = require('../controllers/book.controller');

const route = express.Router(); 


route.get('/',controller.getAllBooks); //here customMiddleware -- route level middlware




route.get('/:id', controller.getBookById);



route.post('/', controller.createBook);

route.delete('/:id', controller.deleteBookById);



module.exports = route; //default export