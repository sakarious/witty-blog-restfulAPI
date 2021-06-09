const postModel = require("../models/post");
const { commentModel } = require("../models/comment");

module.exports = class blogServices {
  // Create new Post
  static async createPost(author, title, content) {
    try {
      let newPost = await new postModel({
        author,
        title,
        content,
      });
      let response = await newPost.save();
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }
  // Get all Posts
  static async getAllPosts(page = null, limit = null) {
    try {
      if (page && limit != null) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const response = {};

        if (endIndex < (await postModel.countDocuments())) {
          response.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          response.previous = {
            page: page - 1,
            limit: limit,
          };
        }

        response.success = await postModel
          .find({})
          .limit(limit)
          .skip(startIndex);
        return response;
      }

      let docs = await postModel.find({});
      return docs;
    } catch (err) {
      console.log(err.message);
    }
  }
  // Get a Post
  static async getPostById(id) {
    try {
      let postId = id;
      let response = await postModel.findById(postId);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Update a todo
  static async updateTodo(id, title, content) {
    try {
      let response = await postModel.findByIdAndUpdate(
        id,
        { $set: { title, content } },
        { new: true }
      );
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Delete a todo
  static async deletePost(id) {
    try {
      let response = postModel.findByIdAndDelete(id);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  //Add Comment to Post
  static async addComment(id, username, comment) {
    try {
      let postComment = await new commentModel({
        username,
        comment,
      });

      //Save Comment to comment collection
      let newComment = await postComment.save();
      //Add to post
      let response = await postModel.findByIdAndUpdate(
        id,
        { $push: { comments: postComment } },
        { new: true }
      );
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  //Get a comment on a blog post
  static async getComment(postId, commentId) {
    try {
      let response = await postModel.findOne(
        { _id: postId },
        {
          comments: { $elemMatch: { _id: commentId } },
        }
      );
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  //Edit a comment
  static async editComment(postId, commentId, username, comment) {
    try {
      let response = await postModel.findOneAndUpdate(
        { _id: postId, "comments._id": commentId },
        {
          $set: {
            "comments.$.username": username,
            "comments.$.comment": comment,
          },
        },
        { new: true }
      );
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }

  //Delete Comment
  static async deleteComment(postId, commentId) {
    try {
      let response = await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $pull: {
            comments: { _id: commentId },
          },
        },
        { new: true }
      );
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }
};
