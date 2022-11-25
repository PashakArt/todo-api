const Task = require("../models/task.model");

const invallidParametrsMsg = { answer: "Title or discription isn't correct" };
const succesfulMsg = { message: "successful" };

exports.getAll = (req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      // TODO добавить логирование в файл
      res.status(500).json(err.message);
    }
    res.json(tasks);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Task.findById(id, (err, task) => {
    if (err) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(task);
  });
};

exports.createTask = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const task = new Task({
    title: title,
    description: description,
    isActive: true,
  });
  try {
    await task.save();
    res.status(201).json(succesfulMsg);
  } catch (error) {
    // TODO добавить логирование в файл
    console.log(error.message);
    res.status(400).json({ message: "Creating task error" });
  }
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  if (!title || !description) {
    res.status(400).json(invallidParametrsMsg);
  }
  Task.findByIdAndUpdate(
    id,
    { title: title, description: description },
    (err) => {
      if (!err) {
        res.json(succesfulMsg);
      }
      res.status(500).json({ message: err.message });
    }
  );
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id, (err) => {
    if (err) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(succesfulMsg);
  });
};

exports.notFound = (req, res) => res.status(404).end();

exports.serverError = (err, req, res, next) => res.status(500).end();
