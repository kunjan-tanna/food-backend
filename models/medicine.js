const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Rack = require("./rack");
const Package = require("./package");
const Category = require("./category");
const PackageType = require("./packageType");
const User = require("./auth");

const medicineSchema = new mongoose.Schema(
   {
      productName: {
         type: String,
         required: false,
      },
      categoryId: {
         type: ObjectId,
         ref: Category,
         required: false,
      },
      packageId: {
         type: ObjectId,
         ref: Package,
         required: false,
      },
      packageTypeId: {
         type: ObjectId,
         ref: PackageType,
         required: false,
      },
      userId: {
         type: ObjectId,
         ref: User,
         required: false,
      },
      rackId: {
         type: ObjectId,
         ref: Rack,
         required: false,
      },
      purchaseRate: {
         type: Number,
         required: false,
      },
      MRPRate: {
         type: Number,
         required: false,
      },
      saleRate: {
         type: Number,
         required: false,
      },
      noOfItemPack: {
         type: Number,
         required: false,
      },
      noOfSubItemPack: {
         type: Number,
         required: false,
      },
      itemUnitCost: {
         type: Number,
         required: false,
      },
      subItemUnitCost: {
         type: Number,
         required: false,
      },
      quantity: {
         type: Number,

         required: false,
      },
      manufecturingDate: {
         type: Date,
         required: false,
      },
      expireDate: {
         type: Date,
         required: false,
      },
      weight: {
         type: String,
         required: false,
      },
      totalNoOfItem: {
         type: Number,
         required: false,
      },
      totalNoOfQuantity: {
         type: Number,
         required: false,
      },
      saleQuantity: {
         type: Number,
         required: false,
      },
      price: {
         type: Number,
         required: false,
      },
      status: {
         type: String,
         default: "Active",
         enum: ["Active", "Inactive", "Deleted"],
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
