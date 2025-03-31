const express=require('express');
const mongoose=require('mongoose')
const app=express();
const port=1200;
const model=require("./models/listing");
const path=require('path')
const methodOverride=require('method-override')
const engine = require('ejs-mate')
main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlist");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/",(req,res)=>{
    res.send("welcome to root page");
})
//index route
app.get("/listing",async (req,res)=>{
    const allListing=await model.find({});
    res.render("./listing/index.ejs",{allListing});
})

//new
app.get("/listing/new",(req,res)=>{
    res.render("./listing/new.ejs")
})
//create
app.post("/listing",(req,res)=>{
    let listing=req.body.listing
    console.log(listing)
    let newListing=new model(listing);
    newListing.save();
    res.redirect("/listing")
    
})
//show routes
app.get("/listing/:id",async(req,res)=>{
    let {id}= req.params;
    const gethotel=await model.findById(id);
    res.render("./listing/show.ejs",{gethotel});
})
//edit
app.get("/listing/:id/Edit",async (req,res)=>{
    let {id}=req.params;
    const editHotel=await model.findById(id);
    res.render("./listing/edit.ejs",{editHotel})
})
//update
app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    await model.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listing")
})
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await model.findByIdAndDelete(id);
    res.redirect("/listing")
})
app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
})