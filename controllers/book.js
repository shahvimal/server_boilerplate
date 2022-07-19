const BookModel = require('../models/book');
const constants = require('../config/constants');
const {filteredBody} = require('../utils/filterBody');

module.exports = {
    async createBook(req, res, next){
        try{
            let body = filteredBody(req.body, constants.WHITELIST.books.add)
            let book = await BookModel.createBook(body);
            return res.success("Book Added", book);
        }catch(e){
            return res.error(e);
        }
    },
}