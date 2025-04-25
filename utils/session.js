//for learning purpose only
const express=require('express');
const app=express();
const port=1600;
const session=require("express-session")

app.use(session({secret:"mysupersecretstring"}));
app.get("/test",(req,res)=>{
    res.send("connection successfull")
})

app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
})
