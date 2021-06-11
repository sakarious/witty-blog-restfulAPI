//Test validations
const { expect, assert } = require("chai");
const customValidation = require("../../validations");

describe("Blog Validation", () => {
  describe("Validate Post Properties", () => {
    it("Looks for author, title and content property in an object", () => {
      expect(
        customValidation.validatePostProperties({
          authors: "Author",
          titles: "Title",
        })
      ).to.deep.equal({
        error: {
          description:
            "'author', 'title' and 'content' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validatePostProperties({
          authors: "Author",
          titles: "Title",
          contents: "Content",
        })
      ).to.deep.equal({
        error: {
          description:
            "'author', 'title' and 'content' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validatePostProperties({
          author: "Author",
          title: "Title",
          content: "Content",
          blog: "Blog",
          post: "Post",
        })
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });

  describe("Create Post", () => {
    it("invalidates empty string and strings less than 4 characters in length", () => {
      expect(customValidation.createPost("", "", "")).to.deep.equal({
        error: {
          description:
            "Author Name, Title or content cannot be less than 4 characters",
        },
        isValid: false,
      });

      expect(
        customValidation.createPost("      ", "       ", "      ")
      ).to.deep.equal({
        error: {
          description:
            "Author Name, Title or content cannot be less than 4 characters",
        },
        isValid: false,
      });

      expect(
        customValidation.createPost(
          "Oluwasegun",
          "New Post",
          "My first blog post"
        )
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });

  describe("Validate Request Query Object", () => {
    it("Looks for page and limit property in an object", () => {
      expect(
        customValidation.validateQueryObject({
          pages: "Author",
          limits: "Title",
        })
      ).to.deep.equal({
        error: {
          description: "'page', 'limit' are required in query parameters",
        },
        isValid: false,
      });

      expect(
        customValidation.validateQueryObject({
          pages: "Author",
          limit: "Title",
        })
      ).to.deep.equal({
        error: {
          description: "'page', 'limit' are required in query parameters",
        },
        isValid: false,
      });

      expect(
        customValidation.validateQueryObject({
          page: "Author",
          limits: "Title",
        })
      ).to.deep.equal({
        error: {
          description: "'page', 'limit' are required in query parameters",
        },
        isValid: false,
      });

      expect(
        customValidation.validateQueryObject({
          page: "1",
          limit: "1",
        })
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });

  describe("Validate Request Body Object for Post Update", () => {
    it("Looks for title and content property in an object", () => {
      expect(
        customValidation.validatePostUpdateProperties({
          titles: "Title",
          contents: "Content",
        })
      ).to.deep.equal({
        error: {
          description:
            "'title' and 'content' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validatePostUpdateProperties({
          titles: "Title",
          content: "Content",
        })
      ).to.deep.equal({
        error: {
          description:
            "'title' and 'content' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validatePostUpdateProperties({
          contents: "Content",
          title: "Title",
        })
      ).to.deep.equal({
        error: {
          description:
            "'title' and 'content' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validatePostUpdateProperties({
          title: "Title",
          content: "Content",
        })
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });

  describe("Update Post", () => {
    it("invalidates empty string and strings less than 4 characters in length", () => {
      expect(customValidation.PostUpdate("", "")).to.deep.equal({
        error: {
          description: "Title or content cannot be less than 4 characters",
        },
        isValid: false,
      });

      expect(customValidation.PostUpdate("      ", "       ")).to.deep.equal({
        error: {
          description: "Title or content cannot be less than 4 characters",
        },
        isValid: false,
      });

      expect(
        customValidation.PostUpdate("New Post", "My first blog post")
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });

  describe("Validate Request Body Object for Adding Comment", () => {
    it("Looks for username and comment property in an object", () => {
      expect(
        customValidation.validateCommentProperties({
          usernames: "Username",
          comments: "Comment",
        })
      ).to.deep.equal({
        error: {
          description:
            "'username' and 'comment' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validateCommentProperties({
          usernames: "Username",
          comment: "Comment",
        })
      ).to.deep.equal({
        error: {
          description:
            "'username' and 'comment' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validateCommentProperties({
          username: "Username",
          comments: "Comment",
        })
      ).to.deep.equal({
        error: {
          description:
            "'username' and 'comment' are required fields in request body",
        },
        isValid: false,
      });

      expect(
        customValidation.validateCommentProperties({
          username: "Username",
          comment: "comment",
        })
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });

  describe("Add Comment", () => {
    it("invalidates empty string and strings less than 4 characters in length", () => {
      expect(customValidation.addComment("", "")).to.deep.equal({
        error: {
          description: "Username or comment cannot be less than 4 characters",
        },
        isValid: false,
      });

      expect(customValidation.addComment("      ", "       ")).to.deep.equal({
        error: {
          description: "Username or comment cannot be less than 4 characters",
        },
        isValid: false,
      });

      expect(
        customValidation.addComment("Sakarious", "Nice Post!")
      ).to.deep.equal({
        error: {},
        isValid: true,
      });
    });
  });
});
