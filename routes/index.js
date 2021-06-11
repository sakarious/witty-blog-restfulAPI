const blogRoute = require("./blogRoutes");

module.exports = (app) => {
  app.use("/api/v1", blogRoute);

  app.use("/health", (req, res) => {
    res.send("I'm in a good working condition");
  });
};
