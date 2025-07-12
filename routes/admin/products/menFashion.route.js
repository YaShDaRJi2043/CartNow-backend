const router = require("express").Router();

const menFashionController = require("../../../Controllers/common/menFashion.controller");
const authenticate = require("../../../middlewere/authenticate");

router.post("/add", authenticate, menFashionController.addMenFashion);
router.get("/get", authenticate, menFashionController.getMenFashion);
router.get(
  "/getById/:id",
  authenticate,
  menFashionController.getMenFashionById
);
router.put("/update/:id", authenticate, menFashionController.updateMenFashion);
router.delete(
  "/delete/:id",
  authenticate,
  menFashionController.deleteMenFashion
);

module.exports = router;
