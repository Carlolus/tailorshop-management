const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer.model"); 
const User = require("./user.model"); 

const Order = sequelize.define("order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: "customer_id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  delivery_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(12),
    allowNull: false,
    validate: {
      isIn: [["pendiente", "en proceso", "terminado", "entregado"]],
    },
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
}, {
  tableName: "orders",
  timestamps: true,
});

module.exports = Order;
