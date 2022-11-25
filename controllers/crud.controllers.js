const Task = require("../models/task");

const invallidParametrsMsg = { answer: "Title or discription isn't correct" };

exports.getAll = (req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      // TODO добавить логирование в файл
      res.status(500).end();
    }
    res.json(tasks);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Task.findById(id, (err, task) => {
    if (err) {
      return res.status(404).end();
    }
    res.json(task);
  });
};

exports.createTask = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  if (!title || !description) {
    return res.status(400).json(invallidParametrsMsg);
  }
  const task = new Task({
    title: title,
    description: description,
    isActive: true,
  });
  try {
    await task.save();
    return res.status(201).end();
  } catch (error) {
    // TODO добавить логирование в файл
    console.log(error.message);
    return res.status(500).end();
  }
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  if (!title || !description) {
    return res.status(400).json(invallidParametrsMsg);
  }
  Task.findByIdAndUpdate(
    id,
    { title: title, description: description },
    (err) => {
      if (!err) {
        return res.status(200).end();
      }
      res.status(404).end();
    }
  );
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id, (err) => {
    if (err) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
};

exports.notFound = (req, res) => res.status(404).end();

exports.serverError = (err, req, res, next) => res.status(500).end();
