const express = require("express");
const router = express.Router();

const {
   createPackageType,
   getPackageTypeById,
   getPackageType,
   getAllPackageType,
   updatePackageType,
   deletePackageType,
} = require("../controllers/packageType");

//Get Parameter of Package
router.param("packageTypeId", getPackageTypeById);

//Create Package  Route
router.post("/create/packageType", createPackageType);

//Read Package  Route
router.get("/get/packageType/:packageTypeId", getPackageType);
router.get("/packageType", getAllPackageType);

//Update Package Route
router.put("/edit/packageType/:packageTypeId", updatePackageType);

//Delete Package Route
router.delete("/delete/packageType/:packageTypeId", deletePackageType);

module.exports = router;
