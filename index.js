const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const middlewares = require("./middlewares");
const DBconnect = require("./configs/database");
const logger = require("./configs/logger");

//Setup Middlewares
middlewares(app);

//Setup Routes
routes(app);

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
