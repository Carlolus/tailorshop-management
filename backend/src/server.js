require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes"); // Importar el index de rutas

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Parsear JSON en requests

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando correctamente",
    time: { now: new Date().toISOString() },
  });
});

// Agregar todas las rutas con prefijo "/api"
app.use("", routes);

// Función para iniciar el servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("📦 Conexión con PostgreSQL establecida correctamente");

    // ⚠️ Sincronizar modelos con la BD (solo en desarrollo)
    await sequelize.sync({ alter: true });
    console.log("🔄 Modelos sincronizados con la base de datos");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

// Iniciar servidor
startServer();