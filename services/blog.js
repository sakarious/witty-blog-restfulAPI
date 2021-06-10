//Import Post Schema
const postModel = require("../models/post");
//Import comment schema
const { commentModel } = require("../models/comment");
//Import Logger
const logger = require("../logger");

module.exports = class blogServices {
  // Create new Post
  static async createPost(author, title, content) {
    try {
      //Create new document
      let newPost = await new postModel({
        author,
        title,
        content,
      });
      //Save document
      let response = await newPost.save();

      //Return response to controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(`Services: Error occured in creating post, ${err.message}`);
      return false;
    }
  }
  // Get all Posts
  static async getAllPosts(page = null, limit = null) {
    try {
      //Check if user wants to get post with pagination
      if (page && limit != null) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const response = {};

        //Add next page and limit to response if any
        if (endIndex < (await postModel.countDocuments())) {
          response.next = {
            page: page + 1,
            limit: limit,
          };
        }

        //Add previous page and limit to response if any
        if (startIndex > 0) {
          response.previous = {
            page: page - 1,
            limit: limit,
          };
        }

        //Find post with page and limit requested
        response.success = await postModel
          .find({})
          .limit(limit)
          .skip(startIndex);
        //Return response to controller
        return response;
      }

      //If no pagination, send all blog post in database
      let docs = await postModel.find({});
      //Return response to controller
      return docs;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(
        `Services: Error occured in getting all posts or pagination, ${err.message}`
      );
      return false;
    }
  }
  // Get a Post
  static async getPostById(id) {
    try {
      let postId = id;
      //Find post by ID in database
      let response = await postModel.findById(postId);
      //Return response to controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(
        `Services: Error occured in getting post bt id, ${err.message}`
      );
      return false;
    }
  }

  // Update a todo
  static async updatePost(id, title, content) {
    try {
      //Get id, title and content to be updated and send to database
      let response = await postModel.findByIdAndUpdate(
        id,
        { $set: { title, content } },
        { new: true }
      );
      //return response to controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(`Services: Error occured in updating post, ${err.message}`);
      return false;
    }
  }

  // Delete a todo
  static async deletePost(id) {
    try {
      //Delete post by id in database
      let response = postModel.findByIdAndDelete(id);
      //Return response to controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(`Services: Error occured in deleting post, ${err.message}`);
      return false;
    }
  }

  //Add Comment to Post
  static async addComment(id, username, comment) {
    try {
      //Create new document for post comment
      let postComment = await new commentModel({
        username,
        comment,
      });

      //Save Comment to comment collection
      let newComment = await postComment.save();
      //update a particular post with the unsaved comment document
      let response = await postModel.findByIdAndUpdate(
        id,
        { $push: { comments: postComment } },
        { new: true }
      );
      //return response to the controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(
        `Services: Error occured in adding comment to post, ${err.message}`
      );
      return false;
    }
  }

  //Get a comment on a blog post
  static async getComment(postId, commentId) {
    try {
      //find post by id and find comment a particular comment by id in its comments array of object
      let response = await postModel.findOne(
        { _id: postId },
        {
          comments: { $elemMatch: { _id: commentId } },
        }
      );
      //return response to controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(
        `Services: Error occured in getting a post comment, ${err.message}`
      );
      return false;
    }
  }

  //Edit a comment
  static async editComment(postId, commentId, username, comment) {
    try {
      //Get postID, commentID and fields to be updated (username and comment). Find the post that match post id and comment id and update the particular comment.
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
      //return response to the controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(
        `Services: Error occured in editing post comment, ${err.message}`
      );
      return false;
    }
  }

  //Delete Comment
  static async deleteComment(postId, commentId) {
    try {
      //Get post id and the particular comment id to be delete. Find the post by id and pull the comment object from comments array of object in database
      let response = await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $pull: {
            comments: { _id: commentId },
          },
        },
        { new: true }
      );
      //return response to the controller
      return response;
    } catch (err) {
      //If theres an error, log error to file and return false to controller
      logger.info(
        `Services: Error occured in deleting post comment, ${err.message}`
      );
      return false;
    }
  }
};
