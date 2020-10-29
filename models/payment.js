const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
   {
      paymentBy: {
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

module.exports = mongoose.model("Payment", paymentSchema);
