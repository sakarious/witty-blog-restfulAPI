//MongoDB connection
const mongoose = require("mongoose");
const logger = require("../logger");

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      logger.info(`Connection to DB failed, ${err.message}`);
    } else {
      logger.info(`Connected to MongoDB successful`);
    }
  }
);
