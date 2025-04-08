const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", customerController.getAllCustomers);
/**
 * @swagger
 * /customers/{customer_id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente obtenido exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:customer_id", customerController.getCustomerById);
/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mail:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - name
 *               - mail
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", customerController.createCustomer);
/**
 * @swagger
 * /customers/{customer_id}:
 *   put:
 *     summary: Actualiza un cliente por ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               properties:
 *               name:
 *                 type: string
 *               mail:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:customer_id", customerController.updateCustomer);
/**
 * @swagger
 * /customers/{customer_id}:
 *   delete:
 *     summary: Elimina un cliente por ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:customer_id", customerController.deleteCustomer);

module.exports = router;