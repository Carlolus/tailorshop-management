const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Fabric = require("./fabric.model");
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
    references: {
      model: Fabric,
      key: "fabric_id",
    },
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: GarmentType,
      key: "garment_type_id",
    },
  },
}, {
  tableName: "catalog",
  timestamps: false,
});

module.exports = Catalog;
