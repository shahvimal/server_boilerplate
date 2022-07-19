const router = require("express").Router();
const BookController = require('../controllers/book');

router.post(
    '/add',
    BookController.createBook
);

router.get(
    '/',
    BookController.listBooks  
);

module.exports = router;