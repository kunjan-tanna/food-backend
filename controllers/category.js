const Category = require("../models/category");
const mongoose = require("mongoose");

// Get Id of Category in controller
exports.getCategoryById = (req, res, next, id) => {
   try {
      Category.findById(id).exec((err, category) => {
         if (err) {
            return res.status(400).json({
               error: "Category not found",
            });
         }
         req.category = category;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create Category data in DB
exports.createCategory = (req, res) => {
   try {
      const category = new Category(req.body);
      category.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "category not able to save.",
            });
         }
         res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get Category Data
exports.getCategory = (req, res) => {
   try {
      return res.json(req.category);
   } catch (error) {
      console.log(error);
   }
};

//Get All Category Data
exports.getAllCategory = (req, res) => {
   try {
      Category.find().exec((err, category) => {
         if (err) {
            return res.status(400).json({
               error: "No category found",
            });
         }
         res.json(category);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update Category Data
exports.updateCategory = async (req, res) => {
   try {
      let client = await Category.findOne({
         _id: mongoose.Types.ObjectId(req.body.categoryId),
      });
      if (!client) {
         return res.send("Something Went wrong");
      } else {
         let editCategory = await Category.updateMany(
            { _id: req.body.categoryId },
            {
               categotyName: req.body.categotyName,
               status: req.body.status,
            }
         );
         if (editCategory.nModified > 0) {
            let client = await Category.findOne({
               _id: mongoose.Types.ObjectId(req.body.categoryId),
            });
            return res.json({ client });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete Category Data
exports.deleteCategory = (req, res) => {
   try {
      let category = req.category;
      Category.deleteOne(category, (err, category) => {
         if (err) {
            return res.status(400).json({
               error: "No Category found",
            });
         }
         res.send("Category details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};
