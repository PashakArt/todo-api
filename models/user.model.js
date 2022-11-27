/** @module */

const mongoose = require("mongoose");

/** schema of User document */
const userShema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userShema);

module.exports = User;
