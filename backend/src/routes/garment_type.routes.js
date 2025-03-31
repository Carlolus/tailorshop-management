const express = require("express");
const router = express.Router();
const garmentTypeController = require("../controllers/garment_type.controller");

// Get all garments
router.get("/", garmentTypeController.getAllGarmentType);

// Get a garment by ID
router.get("/:id", garmentTypeController.getGarmentTypeById);

// Create a new garment
router.post("/", garmentTypeController.createGarmentType);

// Update a garment by ID
router.put("/:id", garmentTypeController.updateGarmentType);

// Delete a garment by ID
router.delete("/:id", garmentTypeController.deleteGarmentType);

module.exports = router;