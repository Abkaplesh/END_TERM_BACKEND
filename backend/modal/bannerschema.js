const mongoose = require("mongoose");

const banner = mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    link:{
        type:String
    }
});
const model = mongoose.model("Banner", banner);
module.exports = model;
