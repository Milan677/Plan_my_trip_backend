const express= require("express");
const app=express();
require("dotenv").config();
const cors=require("cors")

const{connection}=require("./db");
const{userRouter}=require("./routes/user")

app.use(express.json());
app.use(cors("*"))

app.get("/",(req,res)=>{
    res.send("welcome to Plan my trip app")
})

app.use("/api",userRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
       console.log("connected with mongoDB database...")
    } catch (error) {
        console.error(error.message)
    }
    console.log(`server is running at port ${process.env.port}`)
})