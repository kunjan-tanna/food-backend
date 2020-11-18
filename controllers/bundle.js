const Bundle = require("../modules/bundle");
const mongoose = require("mongoose");

//Store bundle data in DB
exports.createbundle = (req, res) => {
   try {
      const bundle = new Bundle(req.body);
      bundle.image = req.file.filename;
      bundle.save((err, bundle) => {
         if (err) {
            return res.status(400).json({
               error: "bundle not found in DB",
            });
         }
         res.json({ bundle });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get All bundle Data
exports.getAllbundle = (req, res) => {
   try {
      Bundle.aggregate([
         {
            $lookup: {
               from: "products",
               localField: "productId",
               foreignField: "_id",
               as: "productDetails",
            },
         },
         {
            $lookup: {
               from: "items",
               localField: "extraItem",
               foreignField: "_id",
               as: "ItemDetails",
            },
         },
      ]).exec((err, bundle) => {
         if (err) {
            return res.status(400).json({
               error: "No bundle found",
            });
         }
         res.json(bundle);
      });
   } catch (error) {
      console.log(error);
   }
};
