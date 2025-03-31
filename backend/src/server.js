require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes"); 
const setupSwagger = require('./config/swagger');
const app = express();
setupSwagger(app);
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

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
    console.log("Conexión con PostgreSQL establecida correctamente");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente");

    app.listen(PORT, () => {
      console.log(`Corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al conectar con DB:", error);
  }
}

startServer();