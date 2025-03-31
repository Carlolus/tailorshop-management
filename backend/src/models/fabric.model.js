const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Fabric = sequelize.define("fabric", {
  fabric_id: {
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
}, {
  tableName: "fabrics",
  timestamps: false,
});

module.exports = Fabric;
