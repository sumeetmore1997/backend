const express=require("express")
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {postRouter}=require("./routes/Post.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
require("dotenv").config()

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Trouble connecting to the DB")
        console.log(err)
    }
    console.log(`running at ${process.env.port}`)
})