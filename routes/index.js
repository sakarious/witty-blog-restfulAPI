const blogRoute = require("./blogRoutes");

module.exports = (app) => {
  app.use("/v1/blog", blogRoute);

  app.use("/health", (req, res) => {
    res.send("I'm in a good working condition");
  });
};
