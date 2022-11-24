const Task = require("./models/task");

exports.getAll = (req, res) => {
  console.log("Показываю все таски");
  Task.find({}, (err, tasks) => {
    res.json({ allTasks: tasks });
  });
};

exports.getById = (req, res) => {
  console.log("Показываю одну таску");
  const id = req.params.id;
  Task.findById(id, (err, task) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json({ task: task });
    }
  });
};

exports.createTask = async (req, res) => {
  console.log("Создаю одну таску");
  title = req.body.title;
  description = req.body.description;
  console.log(`Title is - ${title}\ndescription is - ${description}`);
  const task = new Task({
    title: title,
    description: description,
  });
  await task.save();
  res.json({ message: "successful" });
};

exports.updateTask = (req, res) => {
  console.log("Обновляю одну таску");
};

exports.deleteTask = (req, res) => {
  console.log("Удаляю одну таску");
};
