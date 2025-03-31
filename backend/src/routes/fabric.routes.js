const express = require("express");
const router = express.Router();
const fabricController = require("../controllers/fabric.controller");

router.get("/", fabricController.getAllFabrics);
router.get("/:fabric_id", fabricController.getFabricById);
router.post("/", fabricController.createFabric);
router.put("/:fabric_id", fabricController.updateFabric);
router.delete("/:fabric_id", fabricController.deleteFabric);

module.exports = router;