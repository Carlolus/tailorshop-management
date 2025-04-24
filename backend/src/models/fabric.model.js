/*
  Description: Model for managing fabrics in the application.
  Author: Carlos
  Fecha: 2025-04-23
*/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Fabric = sequelize.define("fabric", {
  fabric_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fabric_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "fabrics",
  timestamps: false,
});

module.exports = Fabric;
