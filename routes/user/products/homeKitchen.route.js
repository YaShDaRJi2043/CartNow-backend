const router = require("express").Router();

const homeKitchenController = require("../../../Controllers/common/homeKitchen.controller");

router.get("/get", homeKitchenController.getHomeKitchen);
router.get("/getById/:id", homeKitchenController.getHomeKitchenById);

module.exports = router;
