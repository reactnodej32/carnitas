const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  post: {
    type: Array,
    required: false,
    default: [],
  },
  users: {
    type: Array,
    required: false,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Group = mongoose.model("group", GroupSchema);
