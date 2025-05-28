/*
  Description: Model for managing payments in the application.
  Author: Carlos
  Fecha: 2025-04-23
*/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Import the Order model to establish a relationship with the Payment model
const Order = require("./order.model");

const Payment = sequelize.define("payment", {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      // Establish a foreign key relationship with the Order model
      model: Order,
      key: "order_id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(12, 0),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM("efectivo", "transferencia", "tarjeta", "otro"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "payments",
  timestamps: false,
});

module.exports = Payment;
