//for learning purpose only
const express=require('express');
const app=express();
const cookieParser = require('cookie-parser')
app.use(cookieParser("secretcode"))
const port=1500;
app.get("/webcookies",(req,res)=>{
    res.cookie("idol","Sree Krishna")
    res.send("cookies sent");
})
app.get("/webcookies/about",(req,res)=>{
    let {idol="brahm"}=req.cookies
    console.dir(req.cookies)
    res.send(`hi i am ${idol} devotee`)
})
app.get("/getsigned",(req,res)=>{
    res.cookie("Password","1234",{signed:true});
    res.send("signed cookie sent")
})
app.get("/getsigned/verify",(req,res)=>{
    //console.dir(req.cookies)
    console.dir(req.signedCookies)
})
app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
})
