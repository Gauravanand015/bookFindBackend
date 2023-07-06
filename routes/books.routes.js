const express = require("express");
const { BookModel } = require("../model/book.model");
const bookRoute = express.Router();

bookRoute.get("/showAllBooks",async(req,res)=>{
    let data = await BookModel.find();
    res.json(data);
})

bookRoute.post("/addBooks",async(req,res)=>{
    const {title,author,genre,description,price} = req.body;
    try {
        let data = new BookModel({
            title,
            author,
            genre,
            description,
            price: +price
        })

        await data.save();
        res.json({"Message":"Book Added"})
    } catch (error) {
        console.log(error);
        res.json("Something went Wrong While Adding Books")
    }
})

bookRoute.delete("/deleteBook/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        let deleteBook = await BookModel.findByIdAndDelete({_id:id});
        res.json({Message:"Book Deleted"})
    } catch (error) {
        
    }
})

bookRoute.get("/filterByGenre/:genre",async(req,res)=>{
    const genre = req.params.genre;
    console.log(genre)
    const filterData = await BookModel.find({genre:genre})
    res.json(filterData)
})

bookRoute.get("/sortByPrice/:price",async(req,res)=>{
    const price = req.params.price;
    if(price == "lowest"){
        const sortedData = await BookModel.find().sort({price:1})
        res.json(sortedData)
    }else if(price == "highest"){
        const sortedData = await BookModel.find().sort({price:-1})
        res.json(sortedData)
    }else if(price == ""){
        const sortedData = await BookModel.find()
        res.json(sortedData)
    }
})

module.exports = {
    bookRoute
}
