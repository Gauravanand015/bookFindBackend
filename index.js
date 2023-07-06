const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { bookRoute } = require("./routes/books.routes");
app.use(cors());
app.use(express.json());
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("BOOK FIND")
})

app.use("/book",bookRoute)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")
        console.log("Connected to server")
    } catch (error) {
        console.log(error,"Error while connecting to server and database")
    }
})