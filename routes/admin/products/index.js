const router = require("express").Router();
const mobileRoute = require("./mobiles.route");
const electronicsRoute = require("./electronics.route");
const menFashionRoute = require("./menFashion.route");
const womenFashionRoute = require("./womenFashion.route");
const homeKitchenRoute = require("./homeKitchen.route");

router.use("/mobileProduct", mobileRoute);
router.use("/electronicProduct", electronicsRoute);
router.use("/menFashionProduct", menFashionRoute);
router.use("/womenFashionProduct", womenFashionRoute);
router.use("/homeKitchenProduct", homeKitchenRoute);

module.exports = router;
