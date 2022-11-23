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
  date: {
    type: Date,
    default: Date.now,
  },
});

const task = mongoose.model("Task", todoSchema);

exports.getAll = (req, res) => {
  console.log("Показываю все таски");
};
exports.getById = (req, res) => {
  console.log("Показываю одну таску");
};
exports.createTask = (req, res) => {
  console.log("Создаю одну таску");
  content = req.body;
  console.log(content);
};
exports.updateTask = (req, res) => {
  console.log("Обновляю одну таску");
};
exports.deleteTask = (req, res) => {
  console.log("Удаляю одну таску");
};
