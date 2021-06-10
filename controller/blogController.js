//Blog Services
const blog = require("../services/blog");
//Validation
const validation = require("../validations");

module.exports = class blogController {
  //Create new post
  static async createPost(req, res) {
    try {
      const { error, isValid } = validation.validatePostProperties(req.body);

      if (!isValid) {
        return res
          .status(400)
          .json({ code: 400, message: error.description, error: true });
      }

      if (isValid) {
        let author = req.body.author;
        let title = req.body.title;
        let content = req.body.content;

        const { error, isValid } = validation.createPost(
          author,
          title,
          content
        );

        if (!isValid) {
          return res
            .status(400)
            .json({ code: 400, message: error.description, error: true });
        }

        let response = await blog.createPost(author, title, content);

        res.status(201).json({ code: "SUCCESS", data: response, error: null });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot create a Post at the moment",
      });
    }
  }

  static async getAllPosts(req, res) {
    try {
      let page = req.query.page ? parseInt(req.query.page) : null;
      let limit = req.query.limit ? parseInt(req.query.limit) : null;

      let response = await blog.getAllPosts(page, limit);

      res.status(200).json({ code: "SUCCESS", success: response, error: null });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot get all todos at the moment",
      });
    }
  }

  static async getPostById(req, res) {
    try {
      let id = req.params.id;
      let response = await blog.getPostById(id);
      if (response) {
        res
          .status(200)
          .json({ code: "SUCCESS", success: response, error: null });
      } else {
        res.status(404).json({
          code: "404",
          success: "Post not found",
          error: "Post not found in database",
        });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "ooopsss... Something terribly went wrong",
      });
    }
  }

  //Update Blog Post
  static async updatePost(req, res) {
    try {
      //validate req body field to contain title and content
      //Make sure title and content isnt empty
      let id = req.params.id;
      let title = req.body.title;
      let content = req.body.content;

      let response = await blog.updateTodo(id, title, content);
      if (response) {
        res
          .status(200)
          .json({ code: "SUCCESS", success: response, error: null });
      } else {
        res.status(404).json({
          code: "404",
          success: "Post not found",
          error: "Post not found in database",
        });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "ooopsss... Something terribly went wrong",
      });
    }
  }

  //Delete Blog Post
  static async deletePost(req, res) {
    try {
      let id = req.params.id;
      let response = await blog.deletePost(id);
      if (response) {
        res.status(200).json({
          code: "SUCCESSFULLY DELETED",
          success: response,
          error: null,
        });
      } else {
        res.status(404).json({
          code: "404",
          success: "Post not found",
          error: "Post not found in database",
        });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "ooopsss... Something terribly went wrong",
      });
    }
  }

  //Add Comment to Post
  static async addComment(req, res) {
    try {
      // const { error, isValid } = validation.validatePostProperties(req.body);

      // if (!isValid) {
      //   return res
      //     .status(400)
      //     .json({ code: 400, message: error.description, error: true });
      // }

      // if (isValid) {
      let id = req.params.postID;
      let username = req.body.username;
      let comment = req.body.comment;

      // const { error, isValid } = validation.createPost(author, title, content);

      // if (!isValid) {
      //   return res
      //     .status(400)
      //     .json({ code: 400, message: error.description, error: true });
      // }

      let response = await blog.addComment(id, username, comment);

      res.status(201).json({ code: "SUCCESS", data: response, error: null });
      // }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot add a comment at the moment",
      });
    }
  }

  //Get a comment on a blog post
  static async getComment(req, res) {
    try {
      let postID = req.params.postID;
      let commentID = req.params.commentID;

      let response = await blog.getComment(postID, commentID);
      if (response) {
        res
          .status(200)
          .json({ code: "SUCCESS", success: response, error: null });
      } else {
        res.status(404).json({
          code: "404",
          success: "Post not found",
          error: "Post not found in database",
        });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot add a comment at the moment",
      });
    }
  }

  //Edit comment on a blog post
  static async editComment(req, res) {
    try {
      let postID = req.params.postID;
      let commentID = req.params.commentID;

      let username = req.body.username;
      let comment = req.body.comment;

      let response = await blog.editComment(
        postID,
        commentID,
        username,
        comment
      );
      if (response) {
        res
          .status(200)
          .json({ code: "SUCCESS", success: response, error: null });
      } else {
        res.status(404).json({
          code: "404",
          success: "Post not found",
          error: "Post not found in database",
        });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot add a comment at the moment",
      });
    }
  }

  //Delete comment on a blog post
  static async deleteComment(req, res) {
    try {
      let postID = req.params.postID;
      let commentID = req.params.commentID;

      let response = await blog.deleteComment(postID, commentID);
      if (response) {
        res
          .status(200)
          .json({ code: "SUCCESS", success: response, error: null });
      } else {
        res.status(404).json({
          code: "404",
          success: "Post not found",
          error: "Post not found in database",
        });
      }
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot add a comment at the moment",
      });
    }
  }
};
