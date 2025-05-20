const { AuditLog } = require("../models");

exports.getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      order: [['timestamp', 'DESC']],
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros de auditoría", error });
  }
};

exports.getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findByPk(req.params.audit_log_id);
    if (!log) return res.status(404).json({ message: "Registro de auditoría no encontrado" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el registro de auditoría", error });
  }
};

exports.createAuditLog = async (req, res) => {
  try {
    const newLog = await AuditLog.create(req.body);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el registro de auditoría", error });
  }
};
