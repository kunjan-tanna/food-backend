const mongoose = require("mongoose");
const Bundle = require("./bundle");
const { ObjectId } = mongoose.Schema;
const Banquet = require("./banquet");


//Create product Schema
const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        bundleId: {
            type: ObjectId,
            ref: Bundle,
            default: null,
        },
        banquetId: {
            type: ObjectId,
            ref: Banquet,
            default: null,
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
            type: Boolean,
            default: "false",
            enum: ["true", "false"]
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
