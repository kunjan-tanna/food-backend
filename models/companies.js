const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema(
   {
      companyName: {
         type: String,
         required: false,
      },
      country: {
         type: String,
         required: false,
      },
      email: {
         type: String,
         required: false,
      },
      contact: {
         type: Number,
         required: false,
      },
      address: {
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

module.exports = mongoose.model("Company", companiesSchema);
