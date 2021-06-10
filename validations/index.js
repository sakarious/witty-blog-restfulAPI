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
      validator.isEmpty(author) ||
      validator.isEmpty(title) ||
      validator.isEmpty(content)
    ) {
      error.description = "Author Name, Title or content cannot be empty";
    }

    if (
      author.trim().length < 4 ||
      title.trim().length < 4 ||
      content.trim().length < 4
    ) {
      error.description =
        "Author Name, Title or content cannot less than 4 characters";
    }

    if (
      validator.isNumeric(author) ||
      validator.isNumeric(title) ||
      validator.isNumeric(content)
    ) {
      error.description = "Author Name, Title or content contain only numbers.";
    }

    if (
      validator.isBoolean(author) ||
      validator.isBoolean(title) ||
      validator.isBoolean(content)
    ) {
      error.description = "Author Name, Title or content contain only numbers.";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }

  //   static getTodoByID(id) {
  //     let error = {};

  //     if (validator.isNumeric(id)) {
  //       error.description = "Unique ID cannot contain only numbers";
  //     }

  //     if (validator.isAlpha(id)) {
  //       error.description = "Unique ID cannot contain only alphabet";
  //     }

  //     if (validator.isAlphanumeric(id)) {
  //       error.description = "Unique ID cannot contain only alphabet and numbers";
  //     }

  //     return { error, isValid: Object.keys(error).length == 0 };
  //   }

  //   static updateTodoByID(id, description) {
  //     let error = {};

  //     if (validator.isNumeric(id)) {
  //       error.description = "Unique ID cannot contain only numbers";
  //     }

  //     if (validator.isAlpha(id)) {
  //       error.description = "Unique ID cannot contain only alphabet";
  //     }

  //     if (validator.isAlphanumeric(id)) {
  //       error.description = "Unique ID cannot contains string";
  //     }

  //     if (validator.isEmpty(description)) {
  //       error.description = "Description cannot be empty";
  //     }

  //     if (validator.isNumeric(description)) {
  //       error.description = "Description cannot be only Numbers";
  //     }

  //     if (validator.isBoolean(description)) {
  //       error.description = "Description cannot be a Boolean";
  //     }

  //     return { error, isValid: Object.keys(error).length == 0 };
  //   }
};
