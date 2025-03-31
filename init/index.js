const mongoose=require('mongoose');
const listingModel=require('../models/listing.js');
const initdata=require('./data');

main().then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlist");
}
const initDB= async ()=>{
    await listingModel.deleteMany({});
    await listingModel.insertMany(initdata.data);
    console.log("DATA INITIALIZED")
}
initDB();