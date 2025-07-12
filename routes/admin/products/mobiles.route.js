const router = require("express").Router();

const mobileController = require("../../../Controllers/common/mobile.controller");
const authenticate = require("../../../middlewere/authenticate");

router.post("/add", authenticate, mobileController.addMobile);
router.get("/get", authenticate, mobileController.getMobile);
router.get("/getById/:id", authenticate, mobileController.getMobileById);
router.put("/update/:id", authenticate, mobileController.updateMobile);
router.delete("/delete/:id", authenticate, mobileController.deleteMobile);

module.exports = router;
