const mongoose = require("mongoose");

const privacy = mongoose.Schema({
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
    head2:{
        type:Object
    },
    title2:{
        type:Object
    },
    
    head3:{
        type:Object
    },
    title3:{
        type:Object
    },
    
    head4:{
        type:Object
    },
    title4:{
        type:Object
    },
    
});
const model = mongoose.model("Privacy", privacy);
module.exports = model;
