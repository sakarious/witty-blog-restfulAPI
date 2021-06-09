const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  username: String,
  comment: String,
  Date: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);
const commentModelSchema = commentSchema;

module.exports = { commentModel, commentModelSchema };
