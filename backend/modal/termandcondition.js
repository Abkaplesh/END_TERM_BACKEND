const mongoose = require("mongoose");

const termsandcondition = mongoose.Schema({
    html:{
        type:String
    }
});
const model = mongoose.model("TermsAndCondition", termsandcondition);
module.exports = model;
