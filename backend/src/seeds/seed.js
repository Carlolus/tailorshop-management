const sequelize = require("../config/database");
// Modelos a utilizar
const Fabric = require("../models/fabric.model");
const GarmentType = require("../models/garment_type.model");
const Customer = require("../models/customer.model");
const Garment = require("../models/garment.model");
const Order = require("../models/order.model");
const Payment = require("../models/payment.model");
const Catalog = require("../models/catalog.model");

async function seed() {
  try {
    await sequelize.authenticate();
    // Fabric seeding
    const fabricCount = await Fabric.count();
    if (fabricCount === 0) {
      await Fabric.bulkCreate([
        {
          fabric_name: "Tela 1",
          description: "Descripción 1",
          image: "https://i.imgur.com/7EocDl4.jpeg",
        },
        {
          fabric_name: "Tela 2",
          description: "Descripción 2",
          image: "https://i.imgur.com/Au1i2Ua.jpeg",
        },
        {
          fabric_name: "Tela 3",
          description: "Descripción 3",
          image: "https://i.imgur.com/PWNcjTF.png",
        },
        {
          fabric_name: "Tela 4",
          description: "Descripción 4",
          image: "https://i.imgur.com/SlphG42.png",
        },
        {
          fabric_name: "Tela 5",
          description: "Descripción 5",
          image: "https://i.imgur.com/cNum45k.png",
        },
        {
          fabric_name: "Tela 6",
          description: "Descripción 6",
          image: "https://i.imgur.com/rvBmZBW.png",
        },
        {
          fabric_name: "Tela 7",
          description: "Descripción 7",
          image: "https://i.imgur.com/Tjl7tl3.png",
        },
        {
          fabric_name: "Tela 8",
          description: "Descripción 8",
          image: "https://i.imgur.com/lCYBfx7.png",
        },
      ]);
      console.log("Telas insertadas");
    } else {
      console.log("Telas ya existen, se omite inserción");
    }

    // Garment Type
    const garmentTypeCount = await GarmentType.count();
    if (garmentTypeCount === 0) {
      await GarmentType.bulkCreate([
        {
          name: "Pantalón",
        },
        {
          name: "Chaqueta",
        },
        {
          name: "Chaleco",
        },
        {
          name: "Camisa",
        },
        {
          name: "Gabardina",
        },
        {
          name: "Vestido de una pieza",
        }
      ]);
    } else {
      console.log("Ya existen garment types")
    }

    // Customer
    const customerCount = await Customer.count();
    if (customerCount === 0) {
      await Customer.bulkCreate([
        {
          name: "Carlos David Córdoba",
          phone: "3218208368",
          address: "Nariño, Nariño",
          mail: "carlos123@gmail.com"
        },
        {
          name: "Diego Germán Delgado",
          phone: "3211239944",
          address: "Jongovito, Pasto",
          mail: "diegogerman123@gmail.com"
        },
        {
          name: "Laura Marcela Gómez",
          phone: "3001122334",
          address: "Taminango, Nariño",
          mail: "lauragomez87@gmail.com"
        },
        {
          name: "Carlos Andrés Muñoz",
          phone: "3105566778",
          address: "Centro, Pasto",
          mail: "carlosmunoz@gmail.com"
        },
        {
          name: "Juliana Fernanda López",
          phone: "3129988776",
          address: "Torobajo, Pasto",
          mail: "juliferlopez@hotmail.com"
        },
        {
          name: "Andrés Felipe Ríos",
          phone: "3014455667",
          address: "Obonuco, Pasto",
          mail: "andresf.rios@yahoo.com"
        },
        {
          name: "Natalia Andrea Torres",
          phone: "3167788990",
          address: "San Juan de Pasto",
          mail: "natorres@mail.com"
        },
        {
          name: "Jorge Eliecer Cabrera",
          phone: "3182211445",
          address: "Las Lunas, Pasto",
          mail: "jorge.cabrera@outlook.com"
        },
        {
          name: "María Camila Villota",
          phone: "3198765432",
          address: "La Rosa, Pasto",
          mail: "camivillota@gmail.com"
        },
        {
          name: "Esteban Mauricio Guerrero",
          phone: "3176543210",
          address: "Panorámico, Pasto",
          mail: "estebanguerrero@mail.com"
        },
        {
          name: "Isabella Sofía Benavides",
          phone: "3153344221",
          address: "Chachagüí, Nariño",
          mail: "isabenavides@gmail.com"
        },
      ]);
      console.log("Clientes insertados");
    } else {
      console.log("Clientes ya existen, se omite inserción");
    };

    // Orders
    const orderCount = await Order.count();
    if (orderCount === 0){
      await Order.bulkCreate([
        {
          customer_id: 1,
          order_date: "2025-04-17",
          delivery_date: "2025-05-01",
          status: "entregado",
          price: 130000,
          balance: 0,
        },
        {
          customer_id: 1,
          order_date: "2025-05-10",
          delivery_date: "2025-05-25",
          status: "pendiente",
          price: 95000,
          balance: 95000
        },
        {
          customer_id: 2,
          order_date: "2025-04-20",
          delivery_date: "2025-05-05",
          status: "entregado",
          price: 180000,
          balance: 0
        },
        {
          customer_id: 2,
          order_date: "2025-05-05",
          delivery_date: "2025-05-30",
          status: "en proceso",
          price: 125000,
          balance: 50000
        },
      ]);
      console.log("Órdenes creadas")
    } else {
      console.log("Ya existen órdenes")
    };

    // Garment
    const garmentCount = await Garment.count();
    if (garmentCount === 0) {
      await Garment.bulkCreate([
         {
          order_id: 1,
          garment_type_id: 1, // Pantalón
          fabric_id: 3,
          quantity: 2,
          person_name: "Carlos David Córdoba",
          details: "Primer pantalón corte recto, segundo pantalón corte campana, bolsillo secreto",
          measures: "Cintura: 10 cm, Pierna: 40 cm, Largo total: 120 cm, Tiro: 30 cm"
        },
        {
          order_id: 1,
          garment_type_id: 2, // Chaqueta
          fabric_id: 5,
          quantity: 1,
          person_name: "Carlos David Córdoba",
          details: "Chaqueta con doble forro térmico y bolsillos con cierre",
          measures: "Cintura: 20 cm, Pierna: 40 cm, Largo total: 120 cm, Tiro: 30 cm"
        },
        {
          order_id: 1,
          garment_type_id: 4, // Camisa
          fabric_id: 1,
          quantity: 3,
          person_name: "Carlos David Córdoba",
          details: "Camisas blancas entalladas, una con cuello italiano",
          measures: "Cintura: 30 cm, Pierna: 40 cm, Largo total: 120 cm, Tiro: 30 cm"
        },
        {
          order_id: 2,
          garment_type_id: 3, // Chaleco
          fabric_id: 2,
          quantity: 2,
          person_name: "Diego Germán Delgado",
          details: "Chalecos formales con botón metálico, uno con bordado personalizado",
          measures: "Cintura: 40 cm, Pierna: 40 cm, Largo total: 120 cm, Tiro: 30 cm"
        },
        {
          order_id: 2,
          garment_type_id: 5, // Gabardina
          fabric_id: 8,
          quantity: 1,
          person_name: "Diego Delgado",
          details: "Gabardina impermeable con capucha desmontable",
          measures: "Cintura: 50 cm, Pierna: 40 cm, Largo total: 120 cm, Tiro: 30 cm"
        },
        {
          order_id: 2,
          garment_type_id: 6, // Vestido de una pieza
          fabric_id: 6,
          quantity: 1,
          person_name: "María Martínez",
          details: "Vestido largo de gala, espalda descubierta, bordado en cintura",
          measures: "Cintura: 60 cm, Pierna: 40 cm, Largo total: 120 cm, Tiro: 30 cm"
        }
      ]);
      console.log("Prendas insertados");
    } else {
      console.log("Prendas ya existen, se omite inserción");
    }
    // Payments
    const countPayments = await Payment.count();
    if (countPayments === 0) {
      await Payment.bulkCreate([
        {
          order: 1,
          amount: 100000,
          payment_date: "2025-04-18T10:30:00",
          payment_method: "efectivo",
          description: "Abono inicial por confección de pantalones y chaqueta"
        },
        {
          order: 1,
          amount: 30000,
          payment_date: "2025-05-01T16:00:00",
          payment_method: "transferencia",
          description: "Pago final al momento de la entrega"
        },
        {
          order: 2,
          amount: 100000,
          payment_date: "2025-05-01T09:00:00",
          payment_method: "tarjeta",
          description: "Pago completo por chalecos y gabardina"
        },
        {
          order: 3,
          amount: 50000,
          payment_date: "2025-05-02T14:45:00",
          payment_method: "efectivo",
          description: "Abono parcial para vestido de gala"
        }
      ]);
      console.log("Pagos insertados correctamente");
    } else {
      console.log("Ya existen pagos");
    }

    const countCatalog = await Catalog.count();
    if (countCatalog === 0) {
      await Catalog.bulkCreate([
        {
          description: "Pantalón clásico corte recto ideal para uso diario, confeccionado con tela resistente y cómoda.",
          image: "https://i.imgur.com/Zssum1E.png",
          fabric: 3,
          type: 1
        },
        {
          description: "Chaqueta elegante con doble forro, ideal para climas fríos. Bolsillos con cremalleras y ajuste en cintura.",
          image: "https://i.imgur.com/ZeGjvUa.png",
          fabric: 5,
          type: 2
        },
        {
          description: "Chaleco formal de tres botones, excelente para eventos o trajes de oficina. Disponible en varios colores.",
          image: "https://i.imgur.com/gdMYyjB.png",
          fabric: 2,
          type: 3
        },
        {
          description: "Camisa blanca entallada con opciones de cuello italiano o francés. Tela ligera y fresca.",
          image: "https://i.imgur.com/vjDxcsa.png",
          fabric: 1,
          type: 4
        },
      ]);
      console.log("Catálogo insertado correctamente");
    } else {
      console.log("Ya existen entradas en el catálogo");
    }
    console.log("✅ Seed finalizado correctamente");
  } catch (err) {
    console.error("❌ Error durante el seeding:", err);
    process.exit(1);
  }
}

module.exports = seed;

if (require.main === module) {
  seed(); // Si lo ejecutas directamente: `node seed.js`
}
