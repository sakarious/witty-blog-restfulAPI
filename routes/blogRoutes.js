const express = require("express");
const router = express.Router();
const Blog = require("../controller/blogController");

//Get all Blog Posts. Takes care of pagination too
router.get("/posts", (req, res) => {
  Blog.getAllPosts(req, res);
});

//Get Post by ID
router.get("/post/:id", (req, res) => {
  Blog.getPostById(req, res);
});

//Create Blog Post
router.post("/post", (req, res) => {
  Blog.createPost(req, res);
});

//Update Blog Post
router.put("/post/:id", (req, res) => {
  Blog.updatePost(req, res);
});

//Delete Blog Post
router.delete("/post/:id", (req, res) => {
  Blog.deletePost(req, res);
});

//Add Comment to Blog Post
router.post("/post/:postID/comment", (req, res) => {
  Blog.addComment(req, res);
});

//Get a particular comment on a Blog Post
router.get("/post/:postID/:commentID", (req, res) => {
  Blog.getComment(req, res);
});

// Edit a comment on a Blog Post
router.put("/post/:postID/:commentID", (req, res) => {
  Blog.editComment(req, res);
});

//Delete a comment on a Blog Post
router.delete("/post/:postID/:commentID", (req, res) => {
  Blog.deleteComment(req, res);
});

module.exports = router;
