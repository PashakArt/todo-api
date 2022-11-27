/** @module */

const { verify } = require("jsonwebtoken");
const { jwtSecret } = require("../config");

/**
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - next object for next action
 */
const checkAuth = async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    verify(token, jwtSecret);
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: "Invalid jwt" });
  }
};

module.exports = checkAuth;
