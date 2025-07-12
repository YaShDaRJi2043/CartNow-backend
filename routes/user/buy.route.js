const router = require("express").Router();

const buyController = require("../../Controllers/user/buy/buy.controller");
const authenticate = require("../../middlewere/authenticate");

router.post("/add", authenticate, buyController.addToBuy);
router.get("/get", authenticate, buyController.getAllOrders);

module.exports = router;
