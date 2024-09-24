const express = require("express");
const productRoutes = new express.Router();

const authenticate = require("../middlewere/authenticate");
const {
  getProductDetail,
} = require("../Controllers/product/productDetailController");
const {
  productAddToCart,
} = require("../Controllers/product/productAddToCartController");
const {
  productDisplayOfCart,
} = require("../Controllers/product/productDisplayOfCartController");
const {
  productRemoveFromCart,
} = require("../Controllers/product/productRemoveFromCartController");
const { allProduct } = require("../Controllers/product/productOfAllCollection");

productRoutes.get("/getproductdetail", getProductDetail);

productRoutes.post("/productAddToCart", authenticate, productAddToCart);

productRoutes.get("/productDisplayOfCart", authenticate, productDisplayOfCart);

productRoutes.delete("/removeProductCart", authenticate, productRemoveFromCart);

productRoutes.get("/allProducts", allProduct);

module.exports = productRoutes;
