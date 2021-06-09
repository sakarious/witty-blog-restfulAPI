const express = require("express");
const router = express.Router();

//Get all Books
router.get("/", (req, res) => {
  res.send("Book API");
});

module.exports = router;
