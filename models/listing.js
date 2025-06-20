const mongoose=require('mongoose');
const schema=mongoose.Schema;
const reviewS=require("./review.js")
//const review_Model=require("./review.js")
const {Schema}=mongoose
const listingSchema=new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>v===""
        ?"https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":
        v,  //new thing
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviewList:[
        {
           type:Schema.Types.ObjectId,
           ref:"Review"
        }
    ]
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await reviewS.deleteMany({_id:{$in:listing.reviewList}})
    }
})
const Listing=new mongoose.model("Listing",listingSchema);
module.exports=Listing;