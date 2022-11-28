/** @module */

const Task = require("../models/task.model");
const invallidParametrsMsg = { answer: "Title or discription isn't correct" };
const succesfulMsg = { message: "successfully" };

/**
 * controller for getting all tasks
 * @param {object} req - request object
 * @param {object} res - response object
 */
exports.getAll = async (req, res) => {
  /** for paggination */
  const { page, limit } = req.query;
  try {
    const tasks = await Task.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return res.json(tasks);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/**
 * controller for getting one task
 * @param {object} req - request object
 * @param {object} res - response object
 */
exports.getById = (req, res) => {
  const id = req.params.id;
  Task.findById(id, (err, task) => {
    if (err) {
      res.status(404).json({ message: "Not found" });
    }
    return res.json(task);
  });
};

/**
 * controller for create one task
 * @param {object} req - request object
 * @param {object} res - response object
 */
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  console.log(title);
  console.log(description);
  const task = new Task({
    title: title,
    description: description,
    isActive: true,
  });
  try {
    await task.save();
    res.status(201).json(succesfulMsg);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Creating task error" });
  }
};

/**
 * controller for update one task
 * @param {object} req - request object
 * @param {object} res - response object
 */
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
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.json(succesfulMsg);
    }
  );
};

/**
 * controller for delete one task
 * @param {object} req - request object
 * @param {object} res - response object
 */
exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id, (err) => {
    if (err) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(succesfulMsg);
  });
};

/**
 * controller to handle unused route
 * @param {object} req - request object
 * @param {object} res - response object
 */
exports.notFound = (req, res) => res.status(404).end();

/**
 * controller to handle unused route
 * @param {object} req - request object
 * @param {object} res - response object
 */
exports.serverError = (err, req, res, next) => res.status(500).end();
