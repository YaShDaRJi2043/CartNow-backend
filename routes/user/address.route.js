const router = require("express").Router();

const addressControllers = require("../../Controllers/user/address/address.controller");
const authenticate = require("../../middlewere/authenticate");

router.post("/add/:id", authenticate, addressControllers.addAddress);
router.get("/get/:id", authenticate, addressControllers.getAddress);
router.put("/update/:id", authenticate, addressControllers.updateAddress);
router.delete("/delete/:id", authenticate, addressControllers.deleteAddress);

module.exports = router;
