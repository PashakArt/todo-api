const Task = require("./models/task");

exports.getAll = (req, res) => {
  Task.find({}, (err, tasks) => {
    res.json(tasks);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Task.findById(id, (err, task) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(task);
    }
  });
};

exports.createTask = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const task = new Task({
    title: title,
    description: description,
  });
  await task.save();
  res.status("201");
  res.json({ message: "successful" });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  Task.findByIdAndUpdate(
    id,
    { title: title, description: description },
    (err) => {
      if (err) {
        res.send(500, err);
        console.log(err.message);
      }
      res.json({ message: "successful" });
    }
  );
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id, (err) => {
    if (err) {
      return res.send(500, err);
    }
    res.json({ message: "successful" });
  });
};
