const JWT = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config({ path: "./.env" });
const authenticate = async (req, res, next) => {
  try {
    const JWT_PASSWORD = process.env.JWT_PASSWORD;
    console.log(JWT_PASSWORD, "at middle");

    const token = req.header("Authorization");

    const user = JWT.verify(token, JWT_PASSWORD);

    const response = await User.findById(user.userId);

    req.user = response;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { authenticate };
