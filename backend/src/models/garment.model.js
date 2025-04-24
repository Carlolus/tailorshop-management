/*
  Description: Model for managing garment types in the application.
  Author: Carlos
  Fecha: 2025-04-23
*/
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Import the Order and GarmentType models to establish relationships with the Garment model
const Order = require("./order.model");
const GarmentType = require("./garment_type.model");

const Garment = sequelize.define("garment", {
  garment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Establish a foreign key relationship with the Order model
    references: {
      model: Order,
      key: "order_id",
    },
  },
  garment_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Establish a foreign key relationship with the GarmentType model
    references: {
      model: GarmentType,
      key: "garment_type_id",
    },
  },
  fabric_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "fabrics",
      key: "fabric_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  person_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "garments",
  timestamps: false,
});

module.exports = Garment;
