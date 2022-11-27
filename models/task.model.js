/** @module */

const mongoose = require("mongoose");

/** schema of Todo document */
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isActive: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", todoSchema);

module.exports = Task;
