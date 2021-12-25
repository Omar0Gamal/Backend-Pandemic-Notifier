const mongoose = require("mongoose");

const cordsSchem = new mongoose.Schema({
  UserUUID: {
    type: String,
    required: true,
  },
  long: {
    type: mongoose.Decimal128,
    required: true,
  },
  lat: {
    type: mongoose.Decimal128,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GpsData", cordsSchem);
