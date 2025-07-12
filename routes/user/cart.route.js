const router = require("express").Router();

const cartController = require("../../Controllers/user/cart/cart.controller");
const authenticate = require("../../middlewere/authenticate");

router.post("/add", authenticate, cartController.addToCart);
router.get("/get/:id", authenticate, cartController.getCart);
router.delete("/delete/:id", authenticate, cartController.deleteCart);

module.exports = router;
