const mongoose = require("mongoose");

const UserSchem = new mongoose.Schema({
  UserUUID: {
    type: String,
    required: true,
  },
  UserEmail: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
  },
  ID: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  UserStatus: {
    type: String,
    required: true,
  },
  LastContectWithPov: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchem);
