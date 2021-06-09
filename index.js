const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const middlewares = require("./middlewares");
const DBconnect = require("./database");

//Setup Middlewares
middlewares(app);

//Setup Routes
routes(app);

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
