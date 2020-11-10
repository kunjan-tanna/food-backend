const mongoose = require("mongoose");


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
