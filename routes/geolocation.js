const express = require("express");
const router = express.Router();

const {
   createGeolocation,

   getAllGeolocation,
} = require("../controllers/geolocation");

//Create customer Route
router.post("/create/geolocation", createGeolocation);

router.get("/geolocation", getAllGeolocation);

module.exports = router;
