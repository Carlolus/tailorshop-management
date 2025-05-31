/*
    Title: index.js
    Author: Carlos
    Date: 2025-04-23
    Description: Main router file for the API. It imports and uses all the route files for different models.
    Usage: This file serves as the main entry point for the API routes. It imports all the route files and uses them with the express router.
*/

const express = require("express");
const router = express.Router();

router.use("/customers", require("./customer.routes"));
router.use("/fabrics", require("./fabric.routes"));
router.use("/catalogs", require("./catalog.routes"));
router.use("/garments", require("./garment.routes"));
router.use("/orders", require("./order.routes"));
router.use("/payments", require("./payment.routes"));
router.use("/garmentstypes", require("./garment_type.routes"));
router.use("/log",require("./audit_log.routes"));
router.use("/uploads",require("./upload.routes"));

// Ruta raíz
router.get("/", (req, res) => {
  res.send("Servidor corriendo");
});

module.exports = router;