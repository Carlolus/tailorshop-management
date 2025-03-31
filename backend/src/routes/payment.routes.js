const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

// Get all payments
router.get("/", paymentController.getAllPayments);

// Get a payment by ID
router.get("/:id", paymentController.getPaymentById);

// Create a new payment
router.post("/", paymentController.createPayment);

// Update a payment by ID
router.put("/:id", paymentController.updatePayment);

// Delete a payment by ID
router.delete("/:id", paymentController.deletePayment);

module.exports = router;