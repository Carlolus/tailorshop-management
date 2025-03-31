const express = require("express");
const router = express.Router();

router.use("/customers", require("./customer.routes"));
router.use("/fabrics", require("./fabric.routes"));
router.use("/garments", require("./garment.routes"));
router.use("/measurements", require("./measurement.routes"));


module.exports = router;