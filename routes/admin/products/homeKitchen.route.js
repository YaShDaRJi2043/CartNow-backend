const router = require("express").Router();

const homeKitchenController = require("../../../Controllers/common/homeKitchen.controller");
const authenticate = require("../../../middlewere/authenticate");

router.post("/add", authenticate, homeKitchenController.addHomeKitchen);
router.get("/get", authenticate, homeKitchenController.getHomeKitchen);
router.get(
  "/getById/:id",
  authenticate,
  homeKitchenController.getHomeKitchenById
);
router.put(
  "/update/:id",
  authenticate,
  homeKitchenController.updateHomeKitchen
);
router.delete(
  "/delete/:id",
  authenticate,
  homeKitchenController.deleteHomeKitchen
);

module.exports = router;
