//Description: This file is responsible for establishing a connection to the PostgreSQL database using Sequelize ORM.
//Author: Carlos
// Date: 2025-04-23
const { Sequelize } = require("sequelize");
require("dotenv").config();
// Create a new Sequelize instance with the database connection details
const sequelize = new Sequelize(
  // Database name, username, password, and options, stored in environment variables
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);
// Export the sequelize instance for use in other parts of the application
// and to allow testing the connection
module.exports = sequelize;