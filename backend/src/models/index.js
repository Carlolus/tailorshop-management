const sequelize = require("../config/database");

// Importar modelos
const Customer = require("./customer.model");
const Order = require("./order.model");
const GarmentType = require("./garment_type.model");
const Garment = require("./garment.model");
const Measurement = require("./measurement.model");
const Payment = require("./payment.model");
const Fabric = require("./fabric.model");
const Catalog = require("./catalog.model");

// Definir relaciones

// Un Cliente tiene muchas Órdenes
Customer.hasMany(Order, { foreignKey: "customer_id", as: "customerOrders" });
Order.belongsTo(Customer, { foreignKey: "customer_id", as: "orderCustomer" });

// Una Orden tiene muchas Prendas
Order.hasMany(Garment, { foreignKey: "order_id", as: "orderGarments" });
Garment.belongsTo(Order, { foreignKey: "order_id", as: "garmentOrder" });

// Una Prenda tiene un tipo de prenda
Garment.belongsTo(GarmentType, { foreignKey: "garment_type", as: "garmentType" });
GarmentType.hasMany(Garment, { foreignKey: "garment_type", as: "garmentList" });

// Una Prenda usa una Tela
Garment.belongsTo(Fabric, { foreignKey: "fabric", as: "garmentFabric" });
Fabric.hasMany(Garment, { foreignKey: "fabric", as: "fabricGarments" });

// Una Prenda tiene medidas registradas en Measurements
Garment.hasOne(Measurement, { foreignKey: "garment_id", as: "garmentMeasurements" });
Measurement.belongsTo(Garment, { foreignKey: "garment_id", as: "measurementGarment" });

// Una Orden puede tener múltiples Pagos
Order.hasMany(Payment, { foreignKey: "order_id", as: "orderPayments" });
Payment.belongsTo(Order, { foreignKey: "order_id", as: "paymentOrder" });

// Catálogo puede referenciar opcionalmente una tela y un tipo de prenda
Catalog.belongsTo(Fabric, { foreignKey: "fabric", allowNull: true, as: "catalogFabric" });
Fabric.hasMany(Catalog, { foreignKey: "fabric", as: "fabricCatalogs" });

Catalog.belongsTo(GarmentType, { foreignKey: "type", allowNull: true, as: "catalogGarmentType" });
GarmentType.hasMany(Catalog, { foreignKey: "type", as: "garmentTypeCatalogs" });

// Exportar modelos
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
