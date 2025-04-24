/*
  Description: Implementation of swagger documentation for the TailorShop Management APIs.
  Author: Carlos
  Date: 2025-04-23
  libraries: swagger-jsdoc, swagger-ui-express (included in the swagger package)
*/
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Define the options for swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TailorShop Management API',
      version: '1.0.0',
      description: 'API para gestión de información de sastrería'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

// Initialize swagger-jsdoc with the options defined above
const specs = swaggerJsdoc(options);

// Middleware to serve swagger documentation
// This middleware will serve the API documentation at the /docs endpoint
module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};