# TailorShop Management System

The **TailorShop Management System** is a backend application designed to manage the operations of a tailor shop. It provides APIs to handle various entities such as garments, catalogs, orders, payments, and measurements. The system is built using Node.js, Express, Sequelize for an easier database management and Docker for contenerization.

## Features

- **Catalog Management**: Manage items in the catalog, including descriptions, images, fabrics, and garment types.
- **Garment Management**: Track garments associated with orders, including details, fabrics, and quantities.
- **Order Management**: Handle customer orders and their associated garments.
- **Payment Management**: Manage payments for orders.
- **Measurement Management**: Store and retrieve measurements for garments.
- **Customers Management**: Manage customer information, including names, contact details.
- **Fabric Management**: Handle fabric details.
- **Garments Type**: Manage different types of garments, such as pants, dresses, and their associated attributes.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **Sequelize**: ORM for database management.
- **Swagger**: API documentation and testing.
- **PostgreSQL**: Relational database for storing data.
- **Docker**: Contenerization

## Project Structure
tailorshop-management/
|_Backend/
|__node_modules/
|__src/
|___config/
|____database.js
|____swagger.js
|___controllers/
|___models/
|___routes/
|___services/
|___server.js
|__.env
|__.gitignore
|__.Dockerfile
|__.package-lock.json
|__.package.json
|_Frontend/
|_docker-compose.yml
|_README.MD