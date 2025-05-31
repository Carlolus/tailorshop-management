const express = require("express");
const app = express();
const routes = require("./routes"); 
const sequelize = require("./config/database");
const cors = require('cors');
const seed = require("./seeds/seed");
const path = require('path');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Swagger
require('./config/swagger')(app);
app.use("", routes); 

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión con PostgreSQL establecida correctamente");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente");

    console.log("Verificando seed");
    await seed();

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();