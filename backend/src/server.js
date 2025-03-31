require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando correctamente",
    time: { now: new Date().toISOString() },
  });
});

app.use("", routes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("📦 Conexión con PostgreSQL establecida correctamente");

    await sequelize.sync({ alter: true });
    console.log("🔄 Modelos sincronizados con la base de datos");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

startServer();