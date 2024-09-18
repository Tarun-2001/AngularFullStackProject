const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email:{
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    default: "General",
  },
});

module.exports = mongoose.model("studentModel", studentSchema);
