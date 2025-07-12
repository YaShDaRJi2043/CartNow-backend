const router = require("express").Router();

const menFashionController = require("../../../Controllers/common/menFashion.controller");

router.get("/get", menFashionController.getMenFashion);
router.get("/getById/:id", menFashionController.getMenFashionById);

module.exports = router;
