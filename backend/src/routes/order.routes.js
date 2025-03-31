const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Get all orders
router.get("/", orderController.getAllOrders);

// Get an order by ID
router.get("/:id", orderController.getOrderById);

// Create a new order
router.post("/", orderController.createOrder);

// Update an order by ID
router.put("/:id", orderController.updateOrder);

// Delete an order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;