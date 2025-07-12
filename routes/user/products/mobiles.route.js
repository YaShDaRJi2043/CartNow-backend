const router = require("express").Router();

const mobileController = require("../../../Controllers/common/mobile.controller");

router.get("/get", mobileController.getMobile);
router.get("/getById/:id", mobileController.getMobileById);

module.exports = router;
