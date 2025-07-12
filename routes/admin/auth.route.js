const router = require("express").Router();

const authController = require("../../Controllers/admin/auth/auth.controller");

router.post("/login", authController.adminLogin);
router.post("/register", authController.adminRegister);

module.exports = router;
