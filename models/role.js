const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
   {
      roleName: {
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

module.exports = mongoose.model("Role", roleSchema);
