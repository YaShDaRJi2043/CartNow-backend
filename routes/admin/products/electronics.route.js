const router = require("express").Router();

const electronicController = require("../../../Controllers/common/electronic.controller");
const authenticate = require("../../../middlewere/authenticate");

router.post("/add", authenticate, electronicController.addElectronic);
router.get("/get", authenticate, electronicController.getElectronic);
router.get(
  "/getById/:id",
  authenticate,
  electronicController.getElectronicById
);
router.put("/update/:id", authenticate, electronicController.updateElectronic);
router.delete(
  "/delete/:id",
  authenticate,
  electronicController.deleteElectronic
);

module.exports = router;
