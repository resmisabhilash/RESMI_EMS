const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");
const { savePayment } = require("../controllers/paymentController");

router.post("/create-payment-intent", createPaymentIntent);
router.post("/save", savePayment); // New route to save payments

module.exports = router;
