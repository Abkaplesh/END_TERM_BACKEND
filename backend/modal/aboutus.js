const mongoose = require("mongoose");

const aboutus = mongoose.Schema({
    head:{
        type:Object
    },
    title:{
        type:Object
    },
    head1:{
        type:Object
    },
    info1:{
        type:Object
    },
    img1:{
        type:Object
    },
    head2:{
        type:Object
    },
    title2:{
        type:Object
    },
    img2:{
        type:Object
    }
});
const model = mongoose.model("Aboutus", aboutus);
module.exports = model;
