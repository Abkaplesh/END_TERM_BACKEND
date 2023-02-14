const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminUserSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
  },
});

module.exports = mongoose.model("adminuser", AdminUserSchema);
