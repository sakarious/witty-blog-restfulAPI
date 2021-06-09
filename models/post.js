const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { commentModelSchema } = require("./comment");

const postSchema = Schema({
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Post Title is Required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Post Content is Required"],
    trim: true,
  },
  comments: [commentModelSchema],
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", postSchema);
