const router = require("express").Router();

const allProductsController = require("../../../Controllers/common/products.controller");

router.get("/get", allProductsController.getAllProduct);
router.get("/getById/:id", allProductsController.getProductById);

module.exports = router;
