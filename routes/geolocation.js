const express = require("express");
const router = express.Router();

const {
   createGeolocation,
   getGeobanquet,
   getAllGeolocation,
} = require("../controllers/geolocation");

//Create customer Route
router.post("/create/geolocation", createGeolocation);

router.get("/geolocation", getAllGeolocation);

//get geo Route
router.get("/geo", getGeobanquet);

module.exports = router;
