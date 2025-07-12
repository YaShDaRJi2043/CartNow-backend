const router = require("express").Router();

const electronicController = require("../../../Controllers/common/electronic.controller");

router.get("/get", electronicController.getElectronic);
router.get("/getById/:id", electronicController.getElectronicById);

module.exports = router;
