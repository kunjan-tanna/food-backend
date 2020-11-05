const express = require("express");
const router = express.Router();

const { createDemo, getAllDemo } = require("../controllers/demo");

//Create customer Route
router.post("/create/demo", createDemo);

router.get("/demo", getAllDemo);

module.exports = router;
