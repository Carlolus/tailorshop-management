/*
  Description: Model for tracking administrative actions (bitácora).
  Author: Carlos
  Fecha: 2025-05-19
*/
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AuditLog = sequelize.define("audit_log", {
  audit_log_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: "UUID del usuario en Keycloak (no es FK)",
  },
  user_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: "Nombre visible del usuario al momento de la acción",
  },
  action: {
    type: DataTypes.ENUM("create", "update", "delete", "login", "logout"),
    allowNull: false,
  },
  entity: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: "Nombre de la entidad modificada, ej: 'fabric', 'client'",
  },
  entity_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: "ID de la entidad modificada",
  },
  changes: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: "Detalle de los cambios (antes y después)",
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }
}, {
  tableName: "audit_logs",
  timestamps: false,
});

module.exports = AuditLog;
