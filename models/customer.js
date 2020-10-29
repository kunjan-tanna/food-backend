const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
   {
      customerName: {
         type: Array,
         default: null,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
