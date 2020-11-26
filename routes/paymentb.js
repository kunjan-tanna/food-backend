let express = require("express");
let router = express.Router();
let { getToken, processPayment } = require("../controllers/paymentb");
let { getUserById } = require("../controllers/auth");

//params
router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", getToken);

router.post("/payment/braintree/:userId", processPayment);

module.exports = router;
