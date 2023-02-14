const mongoose = require('mongoose');


const med_category = mongoose.Schema({
    title: {
        type: String,
        unique: [true, "category alredy present"]
    },
    image:{
        type: String,
    },
    des:{
        type:String
    },
    home_include:{
        type: Boolean,
    },
    bannerImg:{
        type:String
    },
    nav_include:{
        type: Boolean,
    },
    active:{
        type:Boolean,
    }
    
})

const model = mongoose.model('Med_category', med_category);

module.exports = model;