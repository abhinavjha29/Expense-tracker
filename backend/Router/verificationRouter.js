const Express = require("express");
const VerifyController = require("../controllers/verificationMail");
const auth = require("../middlewere/authentication");
const router = Express.Router();

router.post("/email", auth.authenticate, VerifyController.verifyEmailLink);

router.get("/verifyEmail/:id", VerifyController.verifyEmail);
router.post("/reset-password/:token", VerifyController.forgotPassword);
router.post("/forgot-password", VerifyController.forgotPasswordLink);
module.exports = router;
