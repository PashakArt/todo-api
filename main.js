/** @module */

const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const { db_connect, cookieSecret } = require("./config");
const handlers = require("./controllers/crud.controllers");
const userRouter = require("./users/users");
const checkAuth = require("./middleware/verifyLogin.middleware");

/** connect to db */
db_connect();

/** create app */
const app = express();
const port = process.env.PORT || 3000;

/** setting necessary middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "woman",
    secret: cookieSecret,
  })
);

/** connnect to router for register, login, logout */
app.use("/users", userRouter);

/** middleware for check jwt for access to crud methods */
app.use("/todo", checkAuth);

/** CRUD endpoints */
app.get("/todo", handlers.getAll);

app.get("/todo/:id", handlers.getById);

app.post("/todo/create", handlers.createTask);

app.put("/todo/:id", handlers.updateTask);

app.delete("/todo/:id", handlers.deleteTask);

/** run app */
app.listen(port, () => console.log(`App started on http://localhost:${port}`));
