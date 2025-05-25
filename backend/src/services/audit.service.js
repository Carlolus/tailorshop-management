// services/audit.service.js
const { AuditLog } = require('../models');

async function logAudit({ user, action, entity, entity_id, description, changes = null }) {
  try {
    await AuditLog.create({
      user_id: user?.sub ?? null,
      user_name: user?.name ?? 'unknown',
      action,
      entity,
      entity_id,
      description,
      changes
    });
  } catch (error) {
    console.error("Error al registrar en la bitácora:", error);
  }
}

module.exports = { logAudit };
