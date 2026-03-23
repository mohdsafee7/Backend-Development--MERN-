const express = require('express');
const controller = require('../controllers/author.controller');

const route = express.Router();


route.get('/', controller.getAllAuthors);

route.get('/:id', controller.getAuthorById);

route.post('/', controller.createAuthor);

// route.delete('/:id', controller.deleteAuthorById);

route.get('/:id/books', controller.getBooksByAuthorId);



module.exports = route;