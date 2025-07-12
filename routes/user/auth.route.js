const router = require("express").Router();

const authController = require("../../Controllers/user/auth/auth.controller");
const authenticate = require("../../middlewere/authenticate");

router.post("/login", authController.userLogin);
router.post("/register", authController.userRegister);
router.get("/logout", authenticate, authController.userLogout);
router.post("/forgot-password", authController.forgotPassword);
router.get("/forgot-password/:id/:token", authController.verifyLink);
router.post("/:id/:token", authController.newPassword);

module.exports = router;
