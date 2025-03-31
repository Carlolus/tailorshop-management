const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurement.controller");

// Get all measurements
router.get("/", measurementController.getAllMeasurements);

// Get a measurement by garment ID
router.get("/:garment_id", measurementController.getMeasurementByGarmentId);

// Create a new measurement
router.post("/", measurementController.createMeasurement);

// Update a measurement by garment ID
router.put("/:garment_id", measurementController.updateMeasurement);

// Delete a measurement by garment ID
router.delete("/:garment_id", measurementController.deleteMeasurement);

module.exports = router;