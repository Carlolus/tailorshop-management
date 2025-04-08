const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtiene todas las órdenes
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *       500:
 *         description: Error al obtener las órdenes
 */
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /orders/{order_id}:
 *   get:
 *     summary: Obtiene una orden por ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error al obtener la orden
 */
router.get("/:order_id", orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea una nueva orden
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *               order_date:
 *                 type: string
 *                 format: date
 *               delivery_date:
 *                 type: string
 *                 format: date
 *               balance:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       500:
 *         description: Error al crear la orden
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /orders/{order_id}:
 *   put:
 *     summary: Actualiza una orden por ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *               order_date:
 *                 type: string
 *                 format: date
 *               delivery_date:
 *                 type: string
 *                 format: date
 *               balance:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error al actualizar la orden
 */
router.put("/:order_id", orderController.updateOrder);

/**
 * @swagger
 * /orders/{order_id}:
 *   delete:
 *     summary: Elimina una orden por ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden eliminada exitosamente
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error al eliminar la orden
 */
router.delete("/:order_id", orderController.deleteOrder);

module.exports = router;