const logger = require("../logger");
//Blog Services
const blog = require("../services/blog");
//Validation
const validation = require("../validations");

module.exports = class blogController {
  //Create new post
  static async createPost(req, res) {
    try {
      //Validation: Checks to see if required fields can be found in request body object
      const { error, isValid } = validation.validatePostProperties(req.body);

      //If validation fails, send response to user
      if (!isValid) {
        return res
          .status(400)
          .json({ code: 400, message: error.description, error: true });
      }

      //Validation: If first validation passes, validate author, title and content.
      if (isValid) {
        let author = req.body.author;
        let title = req.body.title;
        let content = req.body.content;

        //Validation: validate author,title and content fields
        const { error, isValid } = validation.createPost(
          author,
          title,
          content
        );

        //If validation fails, send response to user
        if (!isValid) {
          return res
            .status(400)
            .json({ code: 400, message: error.description, error: true });
        }
        //If validation passes, send fields to services to create new post and await the response since services returns a promise
        let response = await blog.createPost(author, title, content);

        //If not successful, send json response
        if (response == false) {
          return res.status(500).json({
            code: 500,
            status: "Failed",
            message: "You cannot create a Post at the moment",
          });
        }

        //Get response and send json response
        res.status(201).json({
          code: 201,
          status: "New Post Created Successfully",
          data: response,
          error: null,
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(`Controller: Error occured in creating post, ${err.message}`);
      res.status(500).json({
        code: 500,
        status: "Failed",
        message: "You cannot create a post at the moment",
      });
    }
  }

  static async getAllPosts(req, res) {
    try {
      if (Object.keys(req.query).length != 0) {
        //If request query object is not empty, Check if query object has page and limit
        const { error, isValid } = validation.validateQueryObject(req.query);

        //If validation fails, send error to user
        if (!isValid) {
          return res
            .status(400)
            .json({ code: 400, message: error.description, error: true });
        }

        if (isValid) {
          //After first validation passes, Validate page and limit are integers
          const { error, isValid } = validation.validateQueryParams(
            req.query.page,
            req.query.limit
          );
          //If validation fails, send error to user
          if (!isValid) {
            return res
              .status(400)
              .json({ code: 400, message: error.description, error: true });
          }
        }
      }
      //Check if there's a page or limit query. If there isn't, assign null to page and limit but if there is, change type of page and limit to Number
      let page = req.query.page ? parseInt(req.query.page) : null;
      let limit = req.query.limit ? parseInt(req.query.limit) : null;

      //Send to services and await response
      let response = await blog.getAllPosts(page, limit);

      //If not successful, send json response
      if (response === "false") {
        return res.status(500).json({
          code: 500,
          status: "Failed",
          message: "You cannot get all posts at the moment",
        });
      }

      //If successful, send json response
      if (response.length != 0) {
        res
          .status(200)
          .json({ code: 200, status: "Success", data: response, error: null });
      } else {
        res.status(200).json({
          code: 200,
          data: response,
          status: "No Post in Database",
          message: "No Post in Database,Start Writing.",
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(
        `Controller: Error occured in getting all post or pagination, ${err.message}`
      );
      res.status(500).json({
        code: 500,
        status: "Failed",
        Message: "You cannot get all posts at the moment",
      });
    }
  }

  static async getPostById(req, res) {
    try {
      // Get ID from request parameters
      let id = req.params.id;

      //Send to services and await response
      let response = await blog.getPostById(id);

      //If theres a match, send json response
      if (response !== "false") {
        res
          .status(200)
          .json({ code: 200, status: "Success", data: response, error: null });
      } else {
        res.status(404).json({
          code: 404,
          status: "Post not found",
          message: "Post not found in database",
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(`Controller: Error occured in getting post, ${err.message}`);
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: "You cannot get post at the moment",
      });
    }
  }

  //Update Blog Post
  static async updatePost(req, res) {
    try {
      //Validation: Checks to see if required fields can be found in request body object
      const { error, isValid } = validation.validatePostUpdateProperties(
        req.body
      );

      //If validation fails, send response to user
      if (!isValid) {
        return res
          .status(400)
          .json({ code: 400, message: error.description, error: true });
      }

      //If first validation passes, check for second validation
      if (isValid) {
        const { error, isValid } = validation.PostUpdate(
          req.body.title,
          req.body.content
        );

        //If validation fails, send response to user
        if (!isValid) {
          return res
            .status(400)
            .json({ code: 400, message: error.description, error: true });
        }
      }

      //Get post Id from request parameter and validated title, content from req body
      let id = req.params.id;
      let title = req.body.title;
      let content = req.body.content;

      //Send to services for processing and await response
      let response = await blog.updatePost(id, title, content);
      //If response is successful, send json response
      if (response !== "false") {
        res
          .status(200)
          .json({ code: 200, status: "Success", data: response, error: null });
      } else {
        //Post to be edited not found
        res.status(404).json({
          code: 404,
          status: "Post not found",
          message: "Post not found in database",
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(`Controller: Error occured in updating post, ${err.message}`);
      res.status(500).json({
        code: 500,
        status: "Failed",
        message: "You cannot update post at the moment",
      });
    }
  }

  //Delete Blog Post
  static async deletePost(req, res) {
    try {
      //Get ID from request parameter
      let id = req.params.id;
      //Send to services and wait for response
      let response = await blog.deletePost(id);
      console.log(response);

      //If successful, send json response
      if (response) {
        res.status(200).json({
          code: 200,
          status: "Success",
          data: response,
          error: null,
        });
      } else {
        //Operation not successful. Return json response
        res.status(404).json({
          code: 404,
          error: "Post not found",
          message: "Post not found in database",
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(`Controller: Error occured in deleting post, ${err.message}`);
      res.status(500).json({
        code: 500,
        message: "Failed",
        error:
          "You cannot delete post at the moment. P.S: Check if post ID is valid",
      });
    }
  }

  //Add Comment to Post
  static async addComment(req, res) {
    try {
      //Validation: Checks to see if required fields can be found in request body object
      const { error, isValid } = validation.validateCommentProperties(req.body);

      if (!isValid) {
        return res
          .status(400)
          .json({ code: 400, message: error.description, error: true });
      }

      //If first check passes, Validate fields
      if (isValid) {
        //Get id from request parameter, username and comment from request body
        let id = req.params.postID;
        let username = req.body.username;
        let comment = req.body.comment;

        //Validate username and comment
        const { error, isValid } = validation.addComment(username, comment);

        //if not valid, send json response
        if (!isValid) {
          return res
            .status(400)
            .json({ code: 400, message: error.description, error: true });
        }

        //Send to services and await response
        let response = await blog.addComment(id, username, comment);

        //If not successful, send json response
        if (response === "false") {
          return res.status(500).json({
            code: 500,
            status: "Failed",
            message:
              "You cannot add a comment at the moment. P.S: Check Post ID",
          });
        }

        if (response == null) {
          return res.status(404).json({
            code: 404,
            status: "Not Found",
            message: "Post to comment to not found in database",
          });
        }

        res
          .status(201)
          .json({ code: 201, status: "Success", data: response, error: null });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(
        `Controller: Error occured in adding a post comment, ${err.message}`
      );
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
      //Get postid and commentid from request parameter
      let postID = req.params.postID;
      let commentID = req.params.commentID;

      //Send to services and wait for response
      let response = await blog.getComment(postID, commentID);

      console.log(response);

      //If post comment not found
      if (response.comments.length == 0) {
        return res.status(404).json({
          code: 404,
          status: "Post comment not found",
          message: "Post comment not found in database",
        });
      }

      //If comment foud, send success json response
      res
        .status(200)
        .json({ code: 200, status: "Success", data: response, error: null });
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(
        `Controller: Error occured in getting a post comment, ${err.message}`
      );
      res.status(500).json({
        code: 500,
        message: "Failed",
        error:
          "You cannot get comment at the moment. P.S: Check Post or Comment ID",
      });
    }
  }

  //Edit comment on a blog post
  static async editComment(req, res) {
    try {
      //Validate request body.
      const { error, isValid } = validation.validateCommentProperties(req.body);

      //If validation fails, return json response
      if (!isValid) {
        return res
          .status(400)
          .json({ code: 400, message: error.description, error: true });
      }

      //If first vaidation passes, validate fields
      if (isValid) {
        const { error, isValid } = validation.addComment(
          req.body.username,
          req.body.comment
        );

        //If validation fails, return response
        if (!isValid) {
          return res
            .status(400)
            .json({ code: 400, message: error.description, error: true });
        }
      }
      //If all validation passes, get postID, commentID from request parameters and username, comment from request body
      let postID = req.params.postID;
      let commentID = req.params.commentID;

      let username = req.body.username;
      let comment = req.body.comment;

      //Send to services and await response
      let response = await blog.editComment(
        postID,
        commentID,
        username,
        comment
      );

      //If not successful,from services send json response
      if (response === "false") {
        return res.status(500).json({
          code: 500,
          status: "Failed",
          message:
            "You cannot update a comment at the moment. P.S: Check Post ID or Comment ID",
        });
      }

      //if found, return json respons
      if (response) {
        res
          .status(200)
          .json({ code: 200, status: "Success", data: response, error: null });
      } else {
        //If comment not found
        res.status(404).json({
          code: 404,
          status: "Post not found",
          message: "Post not found in database",
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(
        `Controller: Error occured when editing post comment, ${err.message}`
      );
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot edit comment at the moment",
      });
    }
  }

  //Delete comment on a blog post
  static async deleteComment(req, res) {
    try {
      //Get PostID and Comment ID from request parameter
      let postID = req.params.postID;
      let commentID = req.params.commentID;

      //Send to services and await response
      let response = await blog.deleteComment(postID, commentID);

      //If failure is from services, send response
      if (response === "false") {
        return res.status(500).json({
          code: 500,
          status: "Failed",
          message:
            "You cannot delete a comment at the moment. P.S: Check Post ID or Comment ID",
        });
      }

      //If comment found and deleted successfully
      if (response) {
        res
          .status(200)
          .json({ code: 200, status: "Success", data: response, error: null });
      } else {
        //If comment not found
        res.status(404).json({
          code: 404,
          status: "Post or comment not found",
          message: "Post or comment not found in database",
        });
      }
    } catch (err) {
      //If theres an error, log error to file and return json response
      logger.info(
        `Controller: Error occured in deleting post comment, ${err.message}`
      );
      res.status(500).json({
        code: 500,
        message: "Failed",
        error: err.message || "You cannot delete comment at the moment",
      });
    }
  }
};
