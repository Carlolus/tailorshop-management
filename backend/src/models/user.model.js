const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4, // Genera automáticamente un UUID para cada nuevo usuario
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Puedes agregar esto si deseas que el mail sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "users",
  timestamps: false, // Asume que no tienes campos de timestamp, si los tienes agrega 'createdAt' y 'updatedAt'
});

module.exports = User;
