const express = require("express");
const router = express.Router();

const {
   createCategory,
   getCategoryById,
   getCategory,
   getAllCategory,
   updateCategory,
   deleteCategory,
} = require("../controllers/category");

//Get Parameter of Category
router.param("categoryId", getCategoryById);

//Create Category  Route
router.post("/create/category", createCategory);

//Read Category  Route
router.get("/get/category/:categoryId", getCategory);
router.get("/category", getAllCategory);

//Update Category Route
router.put("/edit/category/:categoryId", updateCategory);

//Delete Category Route
router.delete("/delete/category/:categoryId", deleteCategory);

module.exports = router;
