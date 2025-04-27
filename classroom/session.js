//for learning purpose only
const express=require('express');
const app=express();
const port=1600;
const session=require("express-session")
const flash = require('connect-flash');
const path=require("path")

app.use(session({
    secret:"mysupersecretstring",  //basically it give a signed cookies so that it can store session id. and secret code is messed with complex random alphabets
    resave:false,
    saveUninitialized:true
}));
app.use(flash()); //used flash

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//testing session id via reqest
app.get("/test",(req,res)=>{
    //res.send("connection successfull")
    if(req.session.count){
        req.session.count++; //what does it mean that it can create a anme variable in req.session objects
    }
    else{
        req.session.count=1;
    }
    console.dir(req.session)
    res.send(`you sent a request ${req.session.count} times`)
})

//checking whether it restore the data for same session
app.get("/register",(req,res)=>{
    let {name="anonymus"}=req.query;
    req.session.name=name; //name has been stored in cookies in a session id now where ever i go on this p;age with same port number that has been defined in app.js i will be getting gsame name that is being passed on cookie as query string
    res.redirect("/dashboard")
})
//accesing and printing it
app.get("/dashboard",(req,res)=>{
    res.send(`hello,${req.session.name}`) //and here it is how we are accesing it
})

//just for practice 
app.get("/register2",(req,res)=>{
    let {name="anonymus"}=req.query
    req.session.name=name;
    res.send("welcome back")
})
//just for practice
app.get("/dashboard2",(req,res)=>{
    res.send(`welcome back to our platform : ${req.session.name}`)
})

//implementing connect flash(usually  a type of tool that help to pop up information only once for a session)
app.get("/flash",(req,res)=>{
    let {otp="XXXX"}=req.query
    req.session.otp=otp;
    //res.send("hii")
        req.flash("success","Bach gaya Bencho🤧")                
    res.redirect("/flashnotes");
})
app.get("/flashnotes",(req,res)=>{
    console.log(req.flash("info"));
    res.locals.successmsg=req.flash("success")
    res.locals.failuremsg=req.flash("failure")
    res.render("flash.ejs",{OTP:req.session.otp})
})
app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
})
