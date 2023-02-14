const mongoose = require("mongoose");

const review = mongoose.Schema({
 review:{
     type:String
 },
 rating:{
     type:Number
 },
 productid: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Med_data",
},
name: {
    type:String
},
});
const model = mongoose.model("Review", review);
module.exports = model;
