const express = require("express");
const postdata = require("../controllers/userController");
const router = express.Router();

router.post("/postSignup", postdata.postUserData);
router.post("/login", postdata.Logindata);

module.exports = router;
