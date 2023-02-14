const mongoose = require("mongoose");

const med_data = mongoose.Schema({
  title: {
    type: String,
  },
  
  description: {
    type: String,
  },
  price: {
    type: Object,
  },
  discountprice: {
    type: Object,
  },
  arabicdescription: {
    type: String,
  },
  image: {
    type: Array,
  },
  category: {
    type: String,
  },
  short: {
    type: String,
  },
  weight: {
    type: String,
  },
  size: {
    type: Array,
  },
  stock:{
    type: Object,
  },
  arabictitle:{
    type:String
  },
  shortaed:{
    type:String
  }
});
const model = mongoose.model("Med_data", med_data);
module.exports = model;
