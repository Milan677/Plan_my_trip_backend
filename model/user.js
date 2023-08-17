const mongoose=require("mongoose");

const tripSchema= mongoose.Schema({
    name:String,
    email:String,
    destination:String,
    travelers:Number,
    budget:Number
})

const tripModel=mongoose.model("Trip",tripSchema);

module.exports={tripModel}