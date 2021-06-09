const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

module.exports = (app) => {
  app.use(helmet());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  //  apply to all requests
  app.use(limiter);
};
