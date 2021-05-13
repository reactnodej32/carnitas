const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
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
  group: {
    type: Array,
    required: false,
    default: [],
  },
  course: {
    type: Array,
    required: false,
    default: [],
  },
  motto: {
    type: String,
    required: false,
    default: "An admin can update my motto",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
