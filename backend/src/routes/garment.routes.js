const express = require("express");
const router = express.Router();
const garmentController = require("../controllers/garment.controller");

// Get all garments
router.get("/", garmentController.getAllGarments);

// Get a garment by ID
router.get("/:id", garmentController.getGarmentById);

// Create a new garment
router.post("/", garmentController.createGarment);

// Update a garment by ID
router.put("/:id", garmentController.updateGarment);

// Delete a garment by ID
router.delete("/:id", garmentController.deleteGarment);

module.exports = router;