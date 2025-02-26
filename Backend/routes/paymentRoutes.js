const express = require("express");
const { purchaseGame, verifyPayment } = require("../controllers/gameController");

const router = express.Router();

router.post("/purchase", purchaseGame); // Route to initiate payment
router.post("/verify", verifyPayment); // Route to verify payment

module.exports = router;
