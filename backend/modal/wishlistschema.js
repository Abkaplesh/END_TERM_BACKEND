const mongoose = require("mongoose");

const wishlist = mongoose.Schema({
  products: [
    {
      productId: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Array,
      },
      image: {
        type: String,
      },
      category: {
        type: String,
      },
      weight: {
        type: String,
      },
      dimensions: {
        type: String,
      },
      
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const model = mongoose.model("Wishlist", wishlist);
module.exports = model;
