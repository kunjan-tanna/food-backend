const express = require("express");
const router = express.Router();

const {
   createPackage,
   getPackageById,
   getPackage,
   getAllPackage,
   updatePackage,
   deletePackage,
} = require("../controllers/package");

//Get Parameter of Package
router.param("packageId", getPackageById);

//Create Package  Route
router.post("/create/package", createPackage);

//Read Package  Route
router.get("/get/package/:packageId", getPackage);
router.get("/package", getAllPackage);

//Update Package Route
router.put("/edit/package/:packageId", updatePackage);

//Delete Package Route
router.delete("/delete/package/:packageId", deletePackage);

module.exports = router;
