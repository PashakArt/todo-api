const express = require("express");

const { userRegister, userLogin } = require("../controllers/users.controllers");

const userRouter = express.Router();

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

module.exports = userRouter;
