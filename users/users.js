/** @module */

const express = require("express");

const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/users.controllers");

/** create router */
const userRouter = express.Router();

/** endpoints to work with users */

/** /users/register */
userRouter.post("/register", userRegister);

/** /users/login */
userRouter.post("/login", userLogin);

/** /users/logout */
userRouter.post("/logout", userLogout);

module.exports = userRouter;
