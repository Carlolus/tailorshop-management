const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Garment = require("./garment.model");

const Measurement = sequelize.define("measurement", {
  garment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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