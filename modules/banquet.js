const mongoose = require("mongoose");

//Create Banquet Schema
const banquetSchema = new mongoose.Schema(
   {
      banName: {
         type: String,
         required: true,
         trim: true,
      },
      capacity: {
         type: String,
         default: null,
      },
      locationLink: {
         type: String,
         default: null,
      },
      location: {
         type: String,
         default: null,
      },

      mobile: {
         type: String,
         trim: true,
         required: true,
      },
      avtar: {
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
module.exports = mongoose.model("Banquet", banquetSchema);
