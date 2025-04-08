const express = require("express");
const router = express.Router();

router.use("/customers", require("./customer.routes"));
router.use("/fabrics", require("./fabric.routes"));
router.use("/catalogs", require("./catalog.routes"));
router.use("/garments", require("./garment.routes"));
router.use("/measurements", require("./measurement.routes"));
router.use("/orders", require("./order.routes"));
router.use("/payments", require("./payment.routes"));
router.use("/garmentstypes", require("./garment_type.routes"));
router.use("/users", require("./user.routes"));

module.exports = router;