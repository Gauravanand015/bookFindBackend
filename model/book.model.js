const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    description:String,
    price:Number
})

const BookModel = mongoose.model("book",booksSchema);

module.exports = {
    BookModel
}