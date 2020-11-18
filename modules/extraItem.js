const mongoose = require("mongoose");

//Create item Schema
const itemSchema = new mongoose.Schema(
   {
      itemName: {
         type: String,
         required: true,
         trim: true,
      },
      price: {
         type: String,
         default: null,
      },
   },
   { timestamps: true }
);
module.exports = mongoose.model("Item", itemSchema);
