const router = require("express").Router();

const UserRoutes = require('./user');
const BookRoutes = require('./book');
// const TestRoutes = require('./test');

router.use('/users',UserRoutes);
// router.use('/tests',TestRoutes);
router.use('/books', BookRoutes);

module.exports = router;