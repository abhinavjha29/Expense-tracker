const Express = require("express");
const expRouter = require("../controllers/Expensecontroller");
const router = Express.Router();
const auth = require("../middlewere/authentication");
router.post("/postDetail", auth.authenticate, expRouter.postDetail);
router.get("/getDetail", auth.authenticate, expRouter.getDetail);
router.delete("/delete/:id", auth.authenticate, expRouter.deleteExp);
module.exports = router;
