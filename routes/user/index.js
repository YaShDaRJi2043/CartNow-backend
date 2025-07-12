const router = require("express").Router();

const authRoute = require("./auth.route");
const productsRoute = require("./products");
const addressRoute = require("./address.route");
const cartRoute = require("./cart.route");
const buyRoute = require("./buy.route");
const feedbackRoute = require("./feedback.route");

router.use("/auth", authRoute);
router.use("/products", productsRoute);
router.use("/address", addressRoute);
router.use("/cart", cartRoute);
router.use("/buy", buyRoute);
router.use("/feedback", feedbackRoute);

module.exports = router;
