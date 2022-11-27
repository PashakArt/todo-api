/** @module */

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT;

/** for connection db */
const db_connect = () => {
  mongoose.connect(DB_CONNECT, { autoIndex: false }, (err) => {
    if (err) {
      console.log(`Exception: ${err.message}`);
      process.exit(1);
    }
  });
};

/** secret part for signature of JWT */
const jwtSecret = process.env.JWT_SECRET;

/** secret of cookie */
const cookieSecret = process.env.COOKIE_SECRET;

module.exports = { db_connect, jwtSecret, cookieSecret };
