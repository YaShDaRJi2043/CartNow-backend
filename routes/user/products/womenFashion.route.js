const router = require("express").Router();

const womenFashionController = require("../../../Controllers/common/womenFashion.controller");

router.get("/get", womenFashionController.getWomenFashion);
router.get("/getById/:id", womenFashionController.getWomenFashionById);

module.exports = router;
