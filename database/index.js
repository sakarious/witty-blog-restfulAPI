//MongoDB connection
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("Connection to DB failed", err.message);
    } else {
      console.log("Connected to MongoDB successful");
    }
  }
);
