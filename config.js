const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT;

const db_connect = () => {
  mongoose.connect(DB_CONNECT, { autoIndex: false }, (err) => {
    if (err) {
      console.log(`Exception: ${err.message}`);
      process.exit(1);
    }
  });
};

const jwtSecret = process.env.SECRET;

module.exports = { db_connect, jwtSecret };
