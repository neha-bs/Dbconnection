const express=require("express")
const app= express()
const bodyparser=require("body-parser")
app.use(bodyparser.json())
const db=require('./dbConnection')
const router=require("./router")
app.use("/",router)


app.listen(4200,function(){
    console.log("Server successfully working at port 4200");
 
})