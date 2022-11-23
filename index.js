const express = require("express");
const bodyParser = require("body-parser");
const handlers = require("./handlers");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get("/todo", handlers.getAll);

app.get("/todo/:id", handlers.getById);

app.post("/todo/create", handlers.createTask);

app.put("/todo/update/:id", handlers.updateTask);

app.delete("/todo/delete/:id", handlers.deleteTask);

app.listen(port, () => console.log(`App started on http://localhost:${port}`));
