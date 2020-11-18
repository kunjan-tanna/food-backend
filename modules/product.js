const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Item = require("./extraItem");
//Create product Schema
const productSchema = new mongoose.Schema(
   {
      productName: {
         type: String,
         required: true,
         trim: true,
      },
      categoryName: {
         type: String,
         required: true,
         trim: true,
      },
      price: {
         type: String,
         default: null,
      },
      quantity: {
         type: Number,
         default: 0,
      },
      extraItem: {
         type: [ObjectId],
         ref: Item,
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
module.exports = mongoose.model("Product", productSchema);
