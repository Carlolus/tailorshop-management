const sequelize = require("../config/database");

const Customer = require("./customer.model");
const Order = require("./order.model");
const GarmentType = require("./garment_type.model");
const Garment = require("./garment.model");
const Measurement = require("./measurement.model");
const Payment = require("./payment.model");
const Fabric = require("./fabric.model");
const Catalog = require("./catalog.model");
const User = require("./user.model")

User.hasMany(Order, {foreignKey: "user_id", as: "userOrders"})
Order.belongsTo(User, { foreignKey: "user_id", as: "orderUser" });

Customer.hasMany(Order, { foreignKey: "customer_id", as: "customerOrders" });
Order.belongsTo(Customer, { foreignKey: "customer_id", as: "orderCustomer" });

Order.hasMany(Garment, { foreignKey: "order_id", as: "orderGarments" });
Garment.belongsTo(Order, { foreignKey: "order_id", as: "garmentOrder" });

Garment.belongsTo(GarmentType, { foreignKey: "garment_type", as: "garmentType" });
GarmentType.hasMany(Garment, { foreignKey: "garment_type", as: "garmentList" });

Garment.belongsTo(Fabric, { foreignKey: "fabric", as: "garmentFabric" });
Fabric.hasMany(Garment, { foreignKey: "fabric", as: "fabricGarments" });

Garment.hasOne(Measurement, { foreignKey: "garment_id", as: "garmentMeasurements" });
Measurement.belongsTo(Garment, { foreignKey: "garment_id", as: "measurementGarment" });

Order.hasMany(Payment, { foreignKey: "order_id", as: "orderPayments" });
Payment.belongsTo(Order, { foreignKey: "order_id", as: "paymentOrder" });

Catalog.belongsTo(Fabric, { foreignKey: "fabric", allowNull: true, as: "catalogFabric" });
Fabric.hasMany(Catalog, { foreignKey: "fabric", as: "fabricCatalogs" });

Catalog.belongsTo(GarmentType, { foreignKey: "type", allowNull: true, as: "catalogGarmentType" });
GarmentType.hasMany(Catalog, { foreignKey: "type", as: "garmentTypeCatalogs" });

module.exports = {
  sequelize,
  Customer,
  Order,
  User,
  GarmentType,
  Garment,
  Measurement,
  Payment,
  Fabric,
  Catalog,
};
