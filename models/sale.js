const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const User = require("./auth");
const Payment = require("./payment");
const Customer = require("./customer");
const Medicine = require("./medicine");


const saleSchema = new mongoose.Schema(
   {
      customerId: {
         type: [ObjectId],
         ref: Customer,
         default: null,
      },
      medicineId: {
         type: [ObjectId],
         ref: Medicine,
         default: null
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
      saleDate: {
         type: Date,
         required: false,
      },

      discount: {
         type: Number,
         required: false,
         default: 0,
      },
      basePrice: {
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

module.exports = mongoose.model("Sale", saleSchema);
