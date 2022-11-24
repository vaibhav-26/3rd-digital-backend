const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log("database is connected successfully");
});

db.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
