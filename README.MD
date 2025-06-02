# TailorShop Management System

This is a web application designed to manage the operations of a tailor shop. It provides APIs to handle various entities, including garments, catalogs, orders, payments, and measurements.

The system features a backend built with Node.js and Express, using Sequelize for database management. The frontend is developed in Angular.

For deployment and management, the entire system is containerized using Docker. This setup includes the following services:

- **backend**: The API service.
- **backend_db**: The database for the backend.
- **frontend**: The Angular application service.
- **keycloak**: An identity and access management server.
- **keycloak_db**: The database for Keycloak.
- **bookstack**: A platform used as a small Knowledge Management System (KMS). Its purpose is to capture and preserve valuable knowledge and expertise from the tailor master, preventing its loss over time.
- **bookstack_db**: The database for BookStack.

This architecture aims to provide a structured approach to managing a tailor shop's operations.

## Features

- **Catalog Management**: Manage items in the catalog, including descriptions, images, fabrics, and garment types.
- **Garment Management**: Track garments associated with orders, including details, fabrics, and quantities.
- **Order Management**: Handle customer orders and their associated garments.
- **Payment Management**: Manage payments for orders.
- **Measurement Management**: Store and retrieve measurements for garments.
- **Customers Management**: Manage customer information, including names, contact details.
- **Fabric Management**: Handle fabric details.
- **Garments Type**: Manage different types of garments, such as pants, dresses, and their associated attributes.


## Entity-relationship diagram
![ER-Diagram](./backend/src/img/test-api/e-rdg.png)

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **Sequelize**: ORM for database management.
- **Swagger**: API documentation and testing.
- **PostgreSQL**: Relational database for storing data.
- **Docker**: Contenerization
- **Keycloak**: Open source IAM solution
- **Angular**: Frontend framework 
- **Bookstack**: Open source platform for organising and storing information.

## Project Structure
```bash
tailorshop-management/
├── Backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── swagger.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
├── Frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── routes/
│   │   ├── index.html
│   │   ├── styles.scss
│   │   └── main.ts
│   ├── .gitignore
│   ├── Dockerfile
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   └── nginx.config
├── docker-compose.yml
└── README.MD
```
## How to run

1. **Clone the Repository**
git clone https://github.com/Carlolus/tailorshop-management.git
2. Join the folder: cd tailorshop-management
3. Do  *docker-compose up --build*  (You need docker installed)
4. Frontend runs on localhost:4200, to log in go to localhost:4200/login and use User: *user-1* Password: *123* (or create a new user in keycloak)


## Swagger API documentation

1. Catalog  
   ![Catalog](./backend/src/img/test-api/catalog.jpg)

2. Customers  
   ![Customers](./backend/src/img/test-api/customers.jpg)

3. Fabrics  
   ![Fabrics](./backend/src/img/test-api/fabrics.jpg)

4. Garment Types  
   ![Garment Types](./backend/src/img/test-api/garment_types.jpg)

5. Garment  
   ![Garment](./backend/src/img/test-api/garments.jpg)

6. Orders  
   ![Orders](./backend/src/img/test-api/orders.jpg)

7. Payments  
   ![Payments](./backend/src/img/test-api/payments.jpg)