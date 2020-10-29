const express = require("express");
const router = express.Router();

const {
   createPurchase,
   getPurchaseById,
   getPurchase,
   getAllPurchase,
   updatePurchase,
   deletePurchase,
} = require("../controllers/purchase");

//Get Parameter of purchase
router.param("purchaseId", getPurchaseById);

//Create purchase  Route
router.post("/create/purchase", createPurchase);

//Read purchase  Route
router.get("/get/purchase/:purchaseId", getPurchase);
router.get("/purchase", getAllPurchase);

//Update purchase Route
router.put("/edit/purchase/:purchaseId", updatePurchase);

//Delete purchase Route
router.delete("/delete/purchase/:purchaseId", deletePurchase);

module.exports = router;
