const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  comment: {
    type: String,
    required: [true, "Comment is Required"],
    trim: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);
const commentModelSchema = commentSchema;

module.exports = { commentModel, commentModelSchema };
