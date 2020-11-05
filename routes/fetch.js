const express = require("express");
const router = express.Router();

const { create, getAll } = require("../controllers/fetch");

//Create customer Route
router.post("/create/data", create);

router.get("/data", getAll);

module.exports = router;
