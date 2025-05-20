/*
  Description: Model for managing garment types in the application.
  Author: Carlos
  Fecha: 2025-04-23
*/
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GarmentType = sequelize.define("garment_type", {
  garment_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [[
        "Pantalón",
        "Chaqueta",
        "Chaleco",
        "Camisa",
        "Gabardina",
        "Vestido de una pieza"
      ]],
    },
  },
}, {
  tableName: "garments_type",
  timestamps: false,
});

module.exports = GarmentType;