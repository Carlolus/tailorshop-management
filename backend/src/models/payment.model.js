const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order.model");

const Payment = sequelize.define("payment", {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
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
