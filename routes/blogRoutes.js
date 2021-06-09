const express = require("express");
const router = express.Router();

//Get all Blog Posts. Takes care of pagination too
router.get("/", (req, res) => {
  res.send("Blog API");
});

//Get Post by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Get blog post with id ${id}`);
});

//Create Blog Post
router.post("/", (req, res) => {
  res.send("Create New Post");
});

//Update Blog Post
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Update post ${id}`);
});

//Delete Blog Post
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Delete blog post with id ${id}`);
});

//Add Comment to Blog Post
router.post("/:postID/comment", (req, res) => {
  const postID = req.params.postID;
  res.send(`Add Comment to Post ${postID}`);
});

//Get All comments on a Blog Post
router.get("/:postID/comments", (req, res) => {
  const postID = req.params.postID;
  res.send(`All comments on Post ${postID}`);
});

//Get a particular comment on a Blog Post
router.get("/:postID/:commentID", (req, res) => {
  const postID = req.params.postID;
  const commentID = req.params.commentID;
  res.send(`Get comment ${commentID} on Post ${postID}`);
});

// Edit a comment on a Blog Post
router.put("/:postID/:commentID", (req, res) => {
  const postID = req.params.postID;
  const commentID = req.params.commentID;
  res.send(`Edit comment ${commentID} on post ${postID}`);
});

//Delete a comment on a Blog Post
router.delete("/:postID/:commentID", (req, res) => {
  const postID = req.params.postID;
  const commentID = req.params.commentID;
  res.send(`Delete comment ${commentID} on post ${postID}`);
});

module.exports = router;
