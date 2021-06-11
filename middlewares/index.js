const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  //  apply to all requests
  app.use(limiter);
};
