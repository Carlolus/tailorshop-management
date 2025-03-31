const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/", customerController.getAllCustomers);
router.get("/:customer_id", customerController.getCustomerById);
router.post("/", customerController.createCustomer);
router.put("/:customer_id", customerController.updateCustomer);
router.delete("/:customer_id", customerController.deleteCustomer);

module.exports = router;