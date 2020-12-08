const express = require("express");
const router = express.Router();

const {
   createProduct,
   getAllProduct,
   getProduct,
   updateIncProduct,
   updateDecProduct,
   getProductById,
   deleteproduct,
} = require("../controllers/product");

//Get Parameter of Product
router.param("productId", getProductById);

//Create Product Route
router.post("/create/product", createProduct);

//Read Product Route
router.get("/get/product/:productId", getProduct);

//Delete ProductByID Route
router.delete("/del/product/:productId", deleteproduct);

//Create Product Route
router.get("/product", getAllProduct);

module.exports = router;
