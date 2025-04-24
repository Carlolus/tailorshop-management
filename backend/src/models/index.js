/*
  Description: This file is responsible for establishing a connection to the PostgreSQL database using Sequelize ORM.
  It also defines the models and their relationships for the application.
  Author: Carlos
  Date: 2025-04-23
  Version: 1.0.0
*/

// Importing the necessary modules and models
const sequelize = require("../config/database");
const Customer = require("./customer.model");
const Order = require("./order.model");
const GarmentType = require("./garment_type.model");
const Garment = require("./garment.model");
const Measurement = require("./measurement.model");
const Payment = require("./payment.model");
const Fabric = require("./fabric.model");
const Catalog = require("./catalog.model");



// The relationships between the models are defined using Sequelize's association methods.
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

// Exporting the sequelize instance and the models for use in other parts of the application
// and to allow testing the connection
module.exports = {
  sequelize,
  Customer,
  Order,
  GarmentType,
  Garment,
  Measurement,
  Payment,
  Fabric,
  Catalog,
};
