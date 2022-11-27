/** @module */

const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/user.model");

/**
 * controller to register users
 * @param {object} req - request object
 * @param {object} res - response object
 */
userRegister = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const username = req.body.username;
    const existingEmail = await User.exists({ email: email });
    const existingUsername = await User.exists({ username: username });
    if (existingEmail || existingUsername) {
      return res.json({ message: "This email or username have used yet" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await user.save();
    return res.json({ message: "successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Registration error" });
  }
};

/**
 * controller to login users
 * @param {object} req - request object
 * @param {object} res - response object
 */
userLogin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = sign(user.username, jwtSecret);
  req.session.token = token;
  return res.json({ message: `${req.body.username} signed in successfully` });
};

/**
 * controller to logout users
 * @param {object} req - request object
 * @param {object} res - response object
 */
userLogout = (req, res) => {
  req.session = null;
  res.json({ message: "You are logged out" });
};

module.exports = { userRegister, userLogin, userLogout };
