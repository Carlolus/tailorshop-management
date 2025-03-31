const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurement.controller");

router.get("/", measurementController.getAllMeasurements);

router.get("/:garment_id", measurementController.getMeasurementByGarmentId);

router.post("/", measurementController.createMeasurement);

router.put("/:garment_id", measurementController.updateMeasurement);

router.delete("/:garment_id", measurementController.deleteMeasurement);

module.exports = router;