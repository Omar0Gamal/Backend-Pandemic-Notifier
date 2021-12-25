const mongoose = require("mongoose");

const ApiTokenSchem = new mongoose.Schema({
  UserUUID: {
    type: String,
    required: true,
  },
  ApiToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ApiToken", ApiTokenSchem);
