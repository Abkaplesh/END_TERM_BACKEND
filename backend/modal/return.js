const mongoose = require("mongoose");

const returns = mongoose.Schema({
    head:{
        type:Object
    },
    title:{
        type:Object
    },
    
    
});
const model = mongoose.model("Return", returns);
module.exports = model;
