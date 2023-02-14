const mongoose = require("mongoose");

const tax = mongoose.Schema({
 INR:{
     type:String
 },
 AED:{
    type:String
},
SAR:{
    type:String
}
});
const model = mongoose.model("Tax", tax);
module.exports = model;
