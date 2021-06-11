// Test Routes
const mongoose = require("mongoose");
const blog = require("../../models/post");
const { commentModel } = require("../../models/comment");
const chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../index");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Route Test", () => {
  //Hook: Before each test we empty the database
  beforeEach((done) => {
    blog.deleteMany({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route for Posts
   */
  describe("/GET blog posts", () => {
    it("it should GET all the posts", (done) => {
      chai
        .request(server)
        .get("/api/v1/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route for Posts
   */
  describe("/POST create a post", () => {
    it("it should not create a post without 'author', 'title' or 'content' fields", (done) => {
      let post = {
        author: "Sakarious",
        title: "New Blog Post",
        body: "My New Blog Post",
      };
      chai
        .request(server)
        .post("/api/v1/post")
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eql(
              "'author', 'title' and 'content' are required fields in request body"
            );
          done();
        });
    });
    it("it should create a post", (done) => {
      let post = {
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      };
      chai
        .request(server)
        .post("/api/v1/post")
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("status")
            .eql("New Post Created Successfully");
          res.body.data.should.have.property("author");
          res.body.data.should.have.property("_id");
          res.body.data.should.have.property("title");
          res.body.data.should.have.property("content");
          res.body.data.should.have.property("comments");
          expect(res.body.data.comments).to.have.lengthOf(0);
          res.body.should.have.property("error").eql(null);
          res.body.data.should.have.property("Date");
          done();
        });
    });
  });

  /*
   * Test the /GET/ by id route for post
   */
  describe("/GET/:id Get a Post by ID", () => {
    it("it should GET a post by the given id", (done) => {
      //Create new Post
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        chai
          .request(server)
          //Use ID from saved post
          .get("/api/v1/post/" + savedPost._id)
          .send(post)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.data.should.have.property("author");
            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("content");
            res.body.data.should.have.property("comments");
            expect(res.body.data.comments).to.have.lengthOf(0);
            res.body.should.have.property("error").eql(null);
            res.body.data.should.have.property("Date");
            res.body.data.should.have.property("_id").eql(savedPost.id);
            done();
          });
      });
    });
  });

  /*
   * Test the /PUT/ by id route for post
   */
  describe("/PUT/:id Update Blog Post By ID", () => {
    it("it should UPDATE a post given the id", (done) => {
      //Add new post to database
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        chai
          .request(server)
          .put("/api/v1/post/" + savedPost._id)
          .send({
            title: "New Blog Post Updated",
            content: "My New Blog Post Updated",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql("Success");
            res.body.data.should.have
              .property("title")
              .eql("New Blog Post Updated");
            res.body.data.should.have
              .property("content")
              .eql("My New Blog Post Updated");
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/ by id route for Post
   */
  describe("/DELETE/:id Delete Blog Post By ID", () => {
    it("it should DELETE a post given the id", (done) => {
      //Add new post to database
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        chai
          .request(server)
          //Delete post by id
          .delete("/api/v1/post/" + savedPost._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql("Success");
            res.body.data.should.have.property("title").eql("New Blog Post");
            res.body.data.should.have
              .property("content")
              .eql("My New Blog Post");
            done();
          });
      });
    });
  });

  /*
   * Test the /POST route for Posts comment
   */
  describe("/POST create a post comment", () => {
    it("it should not create a post comment without a valid post ID", (done) => {
      let postComment = {
        username: "Sakarious",
        comment: "Thumbs Up! Nice Blog Post",
      };
      let wrongPostID = "100001";
      chai
        .request(server)
        .post("/api/v1/post/" + wrongPostID + "/comment")
        .send(postComment)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("Failed");
          res.body.should.have
            .property("message")
            .eql("You cannot add a comment at the moment. P.S: Check Post ID");
          done();
        });
    });
    it("it should not create a post comment without a valid post ID'username' or 'comment' fields", (done) => {
      //Create New Blog Post
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        chai
          .request(server)
          .post("/api/v1/post/" + savedPost._id + "/comment")
          .send({
            username: "Sakarious",
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error").eql(true);
            res.body.should.have.property("code");
            res.body.should.have
              .property("message")
              .eql(
                "'username' and 'comment' are required fields in request body"
              );
            done();
          });
      });
    });
    it("it should create a post comment given a valid post ID", (done) => {
      //Create New Blog Post
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        chai
          .request(server)
          .post("/api/v1/post/" + savedPost._id + "/comment")
          .send({
            username: "Sakarious",
            comment: "Nice Post",
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.data.should.have.property("author");
            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("content");
            res.body.data.should.have.property("comments");
            expect(res.body.data.comments).to.have.lengthOf(1);
            expect(res.body.data.comments[0].username).to.equal("Sakarious");
            expect(res.body.data.comments[0].comment).to.equal("Nice Post");
            res.body.should.have.property("error").eql(null);
            res.body.data.should.have.property("Date");
            res.body.data.should.have.property("_id").eql(savedPost.id);
            done();
          });
      });
    });
  });

  /*
   * Test the /GET/ by id route for post comment
   */
  describe("/GET/:postID/commentID Get a Comment by ID", () => {
    it("it should GET a post comment by the given id", (done) => {
      //Create new Post
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        //Create comment to get
        let postComment = new commentModel({
          username: "Sakarious",
          comment: "Nice Post.",
        });

        blog.findByIdAndUpdate(
          savedPost._id,
          { $push: { comments: postComment } },
          { new: true },
          (err, savedComment) => {
            chai
              .request(server)
              //Use ID from saved post and comment ID from saved comment
              .get(
                "/api/v1/post/" +
                  savedPost._id +
                  "/" +
                  savedComment.comments[0]._id
              )
              .send(post)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                expect(res.body.data._id).to.equal(String(savedPost._id));
                res.body.data.should.have.property("comments");
                expect(res.body.data.comments).to.have.lengthOf(1);
                expect(res.body.data.comments[0]._id).to.equal(
                  String(savedComment.comments[0]._id)
                );
                done();
              });
          }
        );
      });
    });
  });

  /*
   * Test the /PUT route for Posts comment
   */
  describe("/PUT updates a post comment", () => {
    it("it should update a post comment given a valid post id and comment id", (done) => {
      //Create new Post
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        //Create comment to get
        let postComment = new commentModel({
          username: "Sakarious",
          comment: "Nice Post.",
        });

        blog.findByIdAndUpdate(
          savedPost._id,
          { $push: { comments: postComment } },
          { new: true },
          (err, savedComment) => {
            chai
              .request(server)
              .put(
                "/api/v1/post/" +
                  savedPost._id +
                  "/" +
                  savedComment.comments[0]._id
              )
              .send({
                username: "Da Genius",
                comment: "Latest Post",
              })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.data.should.have.property("author");
                res.body.data.should.have.property("title");
                res.body.data.should.have.property("content");
                res.body.data.should.have.property("comments");
                expect(res.body.data.comments[0].username).to.equal(
                  "Da Genius"
                );
                expect(res.body.data.comments[0].comment).to.equal(
                  "Latest Post"
                );
                expect(res.body.data._id).to.equal(String(savedPost._id));
                expect(res.body.data.comments[0]._id).to.equal(
                  String(savedComment.comments[0]._id)
                );
                done();
              });
          }
        );
      });
    });
  });

  /*
   * Test the /DELETE/ by id route for post comment
   */
  describe("/DELETE/:postID/:commentID - Delete a Comment by ID", () => {
    it("it should DELETE a post comment by the given id", (done) => {
      //Create new Post
      let post = new blog({
        author: "Sakarious",
        title: "New Blog Post",
        content: "My New Blog Post",
      });
      //Save Post
      post.save((err, savedPost) => {
        //Create comment to get
        let postComment = new commentModel({
          username: "Sakarious",
          comment: "Nice Post.",
        });

        blog.findByIdAndUpdate(
          savedPost._id,
          { $push: { comments: postComment } },
          { new: true },
          (err, savedComment) => {
            chai
              .request(server)
              //Use ID from saved post and comment ID from saved comment
              .delete(
                "/api/v1/post/" +
                  savedPost._id +
                  "/" +
                  savedComment.comments[0]._id
              )
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                expect(res.body.data._id).to.equal(String(savedPost._id));
                res.body.data.should.have.property("comments");
                expect(res.body.data.comments).to.have.lengthOf(0);
                done();
              });
          }
        );
      });
    });
  });
});
