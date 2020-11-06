const express = require("express");
const router = express.Router();

const { createLocation, getAllLocation } = require("../controllers/location");

//Create customer Route
router.post("/create/location", createLocation);

router.get("/location", getAllLocation);

module.exports = router;
