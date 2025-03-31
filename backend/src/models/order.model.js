const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer.model"); 

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
  timestamps: true, // Sequelize agrega createdAt y updatedAt automáticamente
});

Customer.hasMany(Order, { foreignKey: "customer_id" }); // Un cliente puede tener muchas órdenes
Order.belongsTo(Customer, { foreignKey: "customer_id" }); // Una orden pertenece a un cliente

module.exports = Order;
