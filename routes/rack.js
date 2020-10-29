const express = require("express");
const router = express.Router();

const {
   createRack,
   getRackById,
   getRack,
   getAllRack,
   updateRack,
   deleteRack,
} = require("../controllers/rack");

//Get Parameter of Rack
router.param("rackId", getRackById);

//Create Rack Route
router.post("/create/rack", createRack);

//Read Rack Route
router.get("/get/rack/:rackId", getRack);
router.get("/rack", getAllRack);

//Update Rack Route
router.put("/edit/rack/:packageId", updateRack);

//Delete Rack Route
router.delete("/delete/rack/:rackId", deleteRack);

module.exports = router;
