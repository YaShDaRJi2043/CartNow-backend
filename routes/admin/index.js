const router = require("express").Router();

const authRoute = require("./auth.route");
const productsRoute = require("./products");
const userMasterRoute = require("./userMaster.route");
const feedbackRoute = require("./feedback.route");

router.use("/auth", authRoute);
router.use("/products", productsRoute);
router.use("/userMaster", userMasterRoute);
router.use("/feedback", feedbackRoute);

module.exports = router;
