const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT;

mongoose.connect(DB_CONNECT, { autoIndex: false }, (err) => {
  if (err) {
    console.log(`Exception: ${err.message}`);
    process.exit(1);
  }
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isActive: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", todoSchema);

module.exports = Task;
