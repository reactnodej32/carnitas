const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    required: false,
    default: [],
  },
  stuff: {
    type: String,
    required: false,

    default: "lorem",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Course = mongoose.model("course", CourseSchema);
