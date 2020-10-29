const express = require("express");
const router = express.Router();

const {
   createcustomer,
   getcustomer,
   getAllcustomer,
   getcustomerById,
   updatecustomer,
   deletecustomer,
} = require("../controllers/customer");

//Parameter of customer
router.param("customerId", getcustomerById);

//Create customer Route
router.post("/create/customer", createcustomer);

//Get customer Data
router.get("/get/customer/:customerId", getcustomer);
router.get("/customer", getAllcustomer);

//Update customer Data
router.put("/edit/customer/:customerId", updatecustomer);

//Delete customer Data
router.delete("/delete/customer/:customerId", deletecustomer);

module.exports = router;
