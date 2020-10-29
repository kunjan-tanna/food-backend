const mongoose = require("mongoose");

const rackSchema = new mongoose.Schema(
   {
      rackName: {
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

module.exports = mongoose.model("Rack", rackSchema);
