const mongoose = require("mongoose");

const address = mongoose.Schema({
  address: {
    type: Array,
    default: [],
  },

  shippingAddress: {
    shippingMethod: {
      type: String,
      default: "",
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
    },
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
    address: {
      type: String,
    },
    appartment: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    pin: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const model = mongoose.model("Address", address);
module.exports = model;
