const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db_connect } = require("./config");
const handlers = require("./controllers/crud.controllers");
const userRouter = require("./users/users");

db_connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todo", handlers.getAll);

app.get("/todo/:id", handlers.getById);

app.post("/todo/create", handlers.createTask);

app.put("/todo/:id", handlers.updateTask);

app.delete("/todo/:id", handlers.deleteTask);

app.use("/users", userRouter);

app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => console.log(`App started on http://localhost:${port}`));
