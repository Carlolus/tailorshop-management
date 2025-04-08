const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define("customer", {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  mail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: "customers",
  timestamps: true,
});

module.exports = Customer;