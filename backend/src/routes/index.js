const express = require("express");
const router = express.Router();

router.use("/customers", require("./customer.routes"));
router.use("/fabrics", require("./fabric.routes"));
router.use("/catalogs", require("./catalog.routes"));


module.exports = router;