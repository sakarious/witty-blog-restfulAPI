const blogRoute = require("./blogRoutes");

module.exports = (app) => {
  app.use("/v1/api/blog", blogRoute);

  app.use("/health", (req, res) => {
    res.send("I'm in a good working condition");
  });
};
