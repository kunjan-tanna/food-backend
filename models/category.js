const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
   {
      categotyName: {
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

module.exports = mongoose.model("Category", categorySchema);
