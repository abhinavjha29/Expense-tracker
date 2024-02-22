const User = require("../model/userModel");
const JWT = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
console.log(process.env.JWT_PASSWORD);
async function accessToken(id) {
  console.log(JWT.sign({ userId: id }, process.env.JWT_PASSWORD));
  return JWT.sign({ userId: id }, process.env.JWT_PASSWORD);
}
const postUserData = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const resp = await User.create({ name, email, password });
    console.log(resp);
    res.status(200).json({ msg: "succesful", resp });
  } catch (err) {
    res.status(500).json({ msg: "Unsuccesful" });
    console.log(err);
  }
};

const Logindata = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email: email, password: password });
    if (!data) {
      res.json({ messege: "Wrong Data" });
    } else {
      let id = data._id;
      res.status(202).json({ data, token: await accessToken(id) });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { postUserData, Logindata };
