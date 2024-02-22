const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
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
  userVerified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  DOB: {
    type: Date,
  },
});
const User = mongoose.model("User", schema);

module.exports = User;
