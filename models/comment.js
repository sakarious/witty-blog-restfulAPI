const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);
const commentModelSchema = commentSchema;

module.exports = { commentModel, commentModelSchema };
