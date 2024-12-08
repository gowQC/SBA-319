const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to mongo
mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

module.exports = db;
