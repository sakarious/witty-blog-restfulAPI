//Import express
const express = require("express");
//create app by calling invoking express
const app = express();
//Port
const PORT = process.env.PORT || 3000;
//Import routes
const routes = require("./routes");
//Import middlewares
const middlewares = require("./middlewares");
//Import databse connection
const DBconnect = require("./configs/database");
//Import logger
const logger = require("./logger");

//Setup Middlewares
middlewares(app);

//Setup Routes
routes(app);

//Setup app to listen to incoming request
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});

module.exports = app; //For testing
