const mongoose = require("mongoose");

const packageTypeSchema = new mongoose.Schema(
   {
      packageTypeName: {
         type: String,
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

module.exports = mongoose.model("PackageType", packageTypeSchema);
