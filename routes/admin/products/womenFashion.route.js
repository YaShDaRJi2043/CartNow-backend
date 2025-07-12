const router = require("express").Router();

const womenFashionController = require("../../../Controllers/common/womenFashion.controller");
const authenticate = require("../../../middlewere/authenticate");

router.post("/add", authenticate, womenFashionController.addWomenFashion);
router.get("/get", authenticate, womenFashionController.getWomenFashion);
router.get(
  "/getById/:id",
  authenticate,
  womenFashionController.getWomenFashionById
);
router.put(
  "/update/:id",
  authenticate,
  womenFashionController.updateWomenFashion
);
router.delete(
  "/delete/:id",
  authenticate,
  womenFashionController.deleteWomenFashion
);

module.exports = router;
