const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const User = require("../models/user.model");

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
    res.json({ message: "Succesful" });
  } catch (err) {
    res.status(400).json({ message: "Registration error" });
  }
};

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
  const token = signJWT(user.email, jwtSecret);
  console.log(req.session);
  // TODO доделать аутентификацию и добавление в куки jwt токена
};

userLogout = (req, res) => {};

const signJWT = (email, secret) => {
  return new Promise((resolve, reject) => {
    sign(
      { email, iat: Math.floor(Date.now() / 1000) },
      secret,
      {
        algorithm: "HS256",
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = { userRegister, userLogin, userLogout };
