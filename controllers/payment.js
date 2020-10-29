const Payment = require("../models/payment");
const mongoose = require("mongoose");

// Get Id of Payment in controller
exports.getPaymentById = (req, res, next, id) => {
   try {
      Payment.findById(id).exec((err, payment) => {
         if (err) {
            return res.status(400).json({
               error: "payment not found",
            });
         }
         req.payment = payment;
         next();
      });
   } catch (error) {
      console.log(error);
   }
};

//Create payment data in DB
exports.createPayment = (req, res) => {
   try {
      const payment = new Payment(req.body);
      payment.save((err, client) => {
         if (err) {
            return res.status(400).json({
               error: "payment not able to save.",
            });
         }
         res.json({ client });
      });
   } catch (error) {
      console.log(error);
   }
};

//Get payment Data
exports.getPayment = (req, res) => {
   try {
      return res.json(req.payment);
   } catch (error) {
      console.log(error);
   }
};

//Get All payment Data
exports.getAllPayment = (req, res) => {
   try {
      Payment.find().exec((err, payment) => {
         if (err) {
            return res.status(400).json({
               error: "No payment found",
            });
         }
         res.json(payment);
      });
   } catch (error) {
      console.log(error);
   }
};

//Update payment Data
exports.updatePayment = async (req, res) => {
   try {
      let client = await Payment.findOne({
         _id: mongoose.Types.ObjectId(req.body.paymentId),
      });
      if (!client) {
         return res.send("Something Went wrong");
      } else {
         let editpayment = await Payment.updateMany(
            { _id: req.body.paymentId },
            {
               paymentBy: req.body.paymentBy,
               status: req.body.status,
            }
         );
         if (editpayment.nModified > 0) {
            let client = await Payment.findOne({
               _id: mongoose.Types.ObjectId(req.body.paymentId),
            });
            return res.json({ client });
         }
      }
   } catch (error) {
      console.log(error);
   }
};

//Delete payment Data
exports.deletePayment = (req, res) => {
   try {
      let category = req.payment;
      Payment.deleteOne(category, (err, payment) => {
         if (err) {
            return res.status(400).json({
               error: "No payment found",
            });
         }
         res.send("payment details deleted successfully");
      });
   } catch (error) {
      console.log(error);
   }
};
