const express = require("express");
const router = express.Router();
const garmentController = require("../controllers/garment.controller");

router.get("/", garmentController.getAllGarments);

router.get("/:id", garmentController.getGarmentById);

router.post("/", garmentController.createGarment);

router.put("/:id", garmentController.updateGarment);

router.delete("/:id", garmentController.deleteGarment);

module.exports = router;