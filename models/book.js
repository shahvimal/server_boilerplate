const  { model, Schema } = require('mongoose');
const timestamps = require("mongoose-timestamp");
const db = require('../utils/database');



const BookSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    publication:{
        type:String,
    },
    author:[
        {
            type:String,
        }
    ],
    cost:{
        type:Number,
        required:true,
        unique:true
    },
    category:{
        type:String,
    },
    isBestSeller:{
        type: Boolean,
        required:true
    }
    
},{
    timestamps:true,
    versionKey: false,
});

let Book = db.model('Book', BookSchema);

module.exports = {
    async createBook(book){
        let existedBook = await Book.findOne({
            title:book.title
        });
        if(!existedBook){
            let newBook = await Book.create(book);
            newBook = await Book.findById(newBook._id).lean().exec()
            return newBook;
        }else{
            throw "Book Already Exist";
        }
    }
}