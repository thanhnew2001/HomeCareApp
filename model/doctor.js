const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, default: null },
  age: { type: Number, default: 0 },
  avatar: { type: String, default: null }

});


module.exports = mongoose.model("doctor", doctorSchema);