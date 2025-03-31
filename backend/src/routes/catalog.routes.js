const express = require("express");
const router = express.Router();
const catalogController = require("../controllers/catalog.controller");

router.get("/", catalogController.getAllCatalogs);
router.get("/:catalog_id", catalogController.getCatalogById);
router.post("/", catalogController.createCatalog);
router.put("/:catalog_id", catalogController.updateCatalog);
router.delete("/:catalog_id", catalogController.deleteCatalog);

module.exports = router;