const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/audit_log.controller")
const validateToken = require("../middlewares/validateToken"); 


router.get("/", validateToken, auditLogController.getAllAuditLogs);

router.get("/:log_id", validateToken, auditLogController.getAuditLogById);

router.post("/", validateToken, auditLogController.createAuditLog);

module.exports = router;