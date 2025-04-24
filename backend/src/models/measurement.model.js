/*
  Description: Model for managing measurements types in the application.
  Author: Carlos
  Fecha: 2025-04-23
*/
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Import the Garment model to establish relationships with the Measurement model
const Garment = require("./garment.model");

const Measurement = sequelize.define("measurement", {
  garment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // Establish a foreign key (also used as primary) relationship with the Garment model
    references: {
      model: Garment,
      key: "garment_id",
    },
  },
  measures: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "measurements",
  timestamps: false,
});

module.exports = Measurement;