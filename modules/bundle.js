const mongoose = require("mongoose");
const Product = require("./product");
const { ObjectId } = mongoose.Schema;
const Banquet = require("./banquet");

//Create bundle Schema
const bundleSchema = new mongoose.Schema(
   {
      banName: {
         type: String,
         required: true,
         trim: true,
      },
      description: {
         type: String,
         default: null,
      },
      image: {
         type: String,
         default: null,
      },
      productId: {
         type: [ObjectId],
         ref: Product,
         default: null,
      },
      banquetId: {
         type: ObjectId,
         ref: Banquet,
         default: null,
      },
      status: {
         type: String,
         default: "Active",
         enum: ["Active", "InActive", "Deleted"],
      },
      salt: String,
   },
   { timestamps: true }
);
module.exports = mongoose.model("Bundle", bundleSchema);
