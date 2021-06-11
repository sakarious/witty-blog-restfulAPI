let validator = require("validator");

module.exports = class Validation {
  static validatePostProperties(object) {
    let error = {};

    if (
      "author" in object == false ||
      "title" in object == false ||
      "content" in object == false
    ) {
      error.description =
        "'author', 'title' and 'content' are required fields in request body";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static createPost(author, title, content) {
    let error = {};

    if (
      author.trim().length < 4 ||
      title.trim().length < 4 ||
      content.trim().length < 4
    ) {
      error.description =
        "Author Name, Title or content cannot be less than 4 characters";
    }

    if (
      validator.isNumeric(author) ||
      validator.isNumeric(title) ||
      validator.isNumeric(content)
    ) {
      error.description =
        "Author Name, Title or content contains only numbers.";
    }

    if (
      validator.isBoolean(author) ||
      validator.isBoolean(title) ||
      validator.isBoolean(content)
    ) {
      error.description =
        "Author Name, Title or content contains only Boolean.";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static validateQueryObject(object) {
    let error = {};

    if ("page" in object == false || "limit" in object == false) {
      error.description = "'page', 'limit' are required in query parameters";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static validateQueryParams(page, limit) {
    let error = {};

    if (!validator.isNumeric(page) || !validator.isNumeric(limit)) {
      error.description = "Page or limit fields can only be integers";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static validatePostUpdateProperties(object) {
    let error = {};

    if ("title" in object == false || "content" in object == false) {
      error.description =
        "'title' and 'content' are required fields in request body";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static PostUpdate(title, content) {
    let error = {};

    if (title.trim().length < 4 || content.trim().length < 4) {
      error.description = "Title or content cannot be less than 4 characters";
    }

    if (validator.isNumeric(title) || validator.isNumeric(content)) {
      error.description = " Title or content contains only numbers.";
    }

    if (validator.isBoolean(title) || validator.isBoolean(content)) {
      error.description = "Title or content contains only boolean.";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static validateCommentProperties(object) {
    let error = {};

    if ("username" in object == false || "comment" in object == false) {
      error.description =
        "'username' and 'comment' are required fields in request body";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  static addComment(username, comment) {
    let error = {};

    if (username.trim().length < 4 || comment.trim().length < 4) {
      error.description =
        "Username or comment cannot be less than 4 characters";
    }

    if (validator.isNumeric(username) || validator.isNumeric(comment)) {
      error.description = "Username or comment contains only numbers.";
    }

    if (validator.isBoolean(username) || validator.isBoolean(comment)) {
      error.description = "Username or comment contains only boolean.";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }
};
