const router = require("express").Router();

const userMasterController = require("../../Controllers/admin/userMaster/userMaster.controller");
const authenticate = require("../../middlewere/authenticate");

router.get("/get", authenticate, userMasterController.getAllUsers);

module.exports = router;
