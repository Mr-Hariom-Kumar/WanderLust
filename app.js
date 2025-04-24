const express=require('express');
const mongoose=require('mongoose')
const app=express();
const port=1200;
const model=require("./models/listing");
const path=require('path')
const methodOverride=require('method-override')
const engine = require('ejs-mate')
const wrapAsync=require("./utils/wrapAsync.js")
const review_Model=require("./models/review.js")
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
app.get("/listing",wrapAsync(async (req,res)=>{
    const allListing=await model.find({});
    res.render("./listing/index.ejs",{allListing});
}))

//new
app.get("/listing/new",wrapAsync(async (req,res)=>{
    const allListing=await model.find();
    res.render("./listing/new.ejs",{allListing})
}))
//create
app.post("/listing",wrapAsync(async(req,res,next)=>{
        let listing=req.body.listing
        console.log(listing)
        let newListing=new model(listing);
        await newListing.save();
        res.redirect("/listing")
}))
//show routes
app.get("/listing/:id",wrapAsync(async(req,res)=>{
    let {id}= req.params;
    const gethotel=await model.findById(id).populate("reviewList");
    res.render("./listing/show.ejs",{gethotel});
}))

//post review route
app.post("/listing/:id/reviews",wrapAsync(async(req,res)=>{
    let hotel= await model.findById(req.params.id)
    // console.log(req.body.review)
    let newReview=new review_Model(req.body.review)
    await newReview.save()
    hotel.reviewList.push(newReview)
    await hotel.save()
    console.log(hotel)
    res.redirect(`/listing/${req.params.id}`)
}))

//delete reveiw route
app.delete("/listing/:id/reviews/:reviewId",async(req,res)=>{
    let {id,reviewId}=req.params;
    await model.findByIdAndUpdate(id,{$pull: {reviews: reviewId}})
    await review_Model.findByIdAndDelete(reviewId)
    res.redirect(`/listing/${req.params.id}`)
})
//edit
app.get("/listing/:id/Edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const editHotel=await model.findById(id);
    res.render("./listing/edit.ejs",{editHotel})
}))
//update
app.put("/listing/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    await model.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listing")
}))
app.delete("/listing/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await model.findByIdAndDelete(id);
    res.redirect("/listing")
}))
// app.use((err,req,res,next)=>{
//     res.send("something went wrong")
// })

app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
})
