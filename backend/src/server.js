const express = require("express");
const app = express();
const routes = require("./routes"); 
const sequelize = require("./config/database");

app.use(express.json());

app.use("", routes); 

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión con PostgreSQL establecida correctamente");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente");

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();