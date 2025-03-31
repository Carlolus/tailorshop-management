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
    unique: true, // Llave única
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true, // Campo opcional
  },
  mail: {
    type: DataTypes.STRING(100),
    allowNull: true, // Campo opcional
    validate: {
      isEmail: true, // Validación de correo electrónico
    },
  },
}, {
  tableName: "customers", // Asegura que la tabla en BD se llame "customers"
  timestamps: true, // Agrega automáticamente createdAt y updatedAt
});

module.exports = Customer;