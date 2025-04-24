/*
  Description: Model for managing catalog in the application.
  Author: Carlos
  Fecha: 2025-04-23
*/
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Import the Fabric and GarmentType models to establish relationships with the Catalog model
const Fabric = require("./fabric.model");
// Import the GarmentType model to establish a relationship with the Catalog model
const GarmentType = require("./garment_type.model");

const Catalog = sequelize.define("catalog", {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fabric: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // Establish a foreign key relationship with the Fabric model
    references: {
      model: Fabric,
      key: "fabric_id",
    },
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      // Establish a foreign key relationship with the GarmentType model
      model: GarmentType,
      key: "garment_type_id",
    },
  },
}, {
  tableName: "catalog",
  timestamps: false,
});

module.exports = Catalog;
