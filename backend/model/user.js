const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    gender:String,
    email: String,
    noHp:Number,
    password: String
  })
);

module.exports = User;