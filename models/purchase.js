const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Medicine = require("./medicine");
const Company = require("./companies");
const User = require("./auth");
const Payment = require("./payment");

const purchaseSchema = new mongoose.Schema(
   {
      companyId: {
         type: ObjectId,
         ref: Company,
         required: false,
      },
      medicineId: {
         type: ObjectId,
         ref: Medicine,
         required: false,
      },
      userId: {
         type: ObjectId,
         ref: User,
         required: false,
      },
      paymentId: {
         type: ObjectId,
         ref: Payment,
         required: false,
      },
      purchaseDate: {
         type: Date,
         required: false,
      },
      purchaseQuantity: {
         type: Number,
         required: false,
      },
      total: {
         type: Number,
         required: false,
      },
      discount: {
         type: Number,
         required: false,
      },
      grandTotal: {
         type: Number,
         required: false,
      },
      remarks: {
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

module.exports = mongoose.model("Purchase", purchaseSchema);
