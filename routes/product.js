const express = require("express");
const router = express.Router();

const { createProduct, getAllProduct } = require("../controllers/product");

//Create Product Route
router.post("/create/product", createProduct);

//Create Product Route
router.get("/product", getAllProduct);

module.exports = router;
