const express = require("express");
const router = express.Router();

const { createitem, getAllitem } = require("../controllers/extraItem");

//Create item Route
router.post("/create/item", createitem);

//get all item Route
router.get("/item", getAllitem);

module.exports = router;
