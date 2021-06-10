const { createLogger, transports, format } = require("winston");
const Mongodb = require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logger.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    // new transports.MongoDB({
    //   level: "error",
    //   db: process.env.MONGODB,
    //   collection: "log",
    //   options: { useUnifiedTopology: true },
    //   format: format.combine(format.timestamp(), format.json()),
    // }),
  ],
});

module.exports = logger;
