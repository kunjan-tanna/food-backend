const express = require("express");
const router = express.Router();

const {
   createsale,
   getsaleById,
   getsale,
   getAllsale,
   updatesale,
   deleteSale,
} = require("../controllers/sale");

//Get Parameter of sale
router.param("saleId", getsaleById);

//Create sale  Route
router.post("/create/sale", createsale);

//Read sale  Route
router.get("/get/sale/:saleId", getsale);
router.get("/sale", getAllsale);

//Update sale Route
router.put("/edit/sale/:saleId", updatesale);

//Delete Package Route
router.delete("/delete/sale/:saleId", deleteSale);
module.exports = router;
