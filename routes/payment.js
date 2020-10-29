const express = require("express");
const router = express.Router();

const {
   createPayment,
   getPaymentById,
   getPayment,
   getAllPayment,
   updatePayment,
   deletePayment,
} = require("../controllers/payment");

//Get Parameter of Payment
router.param("paymentId", getPaymentById);

//Create Payment Route
router.post("/create/payment", createPayment);

//Read Payment Route
router.get("/get/payment/:paymentId", getPayment);
router.get("/payment", getAllPayment);

//Update Payment Route
router.put("/edit/payment/:paymentId", updatePayment);

//Delete Payment Route
router.delete("/delete/payment/:paymentId", deletePayment);

module.exports = router;
