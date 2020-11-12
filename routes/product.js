const express = require("express");
const router = express.Router();

const {
   createProduct,
   getAllProduct,
   getProduct,
   updateIncProduct,
   updateDecProduct,
   getProductById,
} = require("../controllers/product");

//Get Parameter of Product
router.param("productId", getProductById);

//Create Product Route
router.post("/create/product", createProduct);

//Update Increment Products
router.put("/edit/inc/product/:productId", updateIncProduct);

//Update Decrements Products
router.put("/edit/dec/product/:productId", updateDecProduct);

//Read Product Route
router.get("/get/product/:productId", getProduct);

//Create Product Route
router.get("/product", getAllProduct);

module.exports = router;
