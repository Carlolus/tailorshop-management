const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Obtiene todos los pagos
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Lista de pagos obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", paymentController.getAllPayments);

/**
 * @swagger
 * /payments/{payment_id}:
 *   get:
 *     summary: Obtiene un pago por ID
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago obtenido exitosamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:payment_id", paymentController.getPaymentById);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Crea un nuevo pago
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: integer
 *                 description: ID del pedido asociado
 *               amount:
 *                 type: number
 *                 description: Monto del pago
 *                 format: float     
 *               payment_date:
 *                 type: string
 *                 description: Fecha de pago
 *                 format: date  
 *               payment_method:
 *                 type: string
 *                 description: Método de pago
 *               description:
 *                  type: string
 *                  description: Descripción x
 *             required:
 *               - amount
 *               - method
 *               - order_id
 *     responses:
 *       201:
 *         description: Pago creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", paymentController.createPayment);

/**
 * @swagger
 * /payments/{payment_id}:
 *   put:
 *     summary: Actualiza un pago por ID
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: integer
 *                 description: ID del pedido asociado
 *               amount:
 *                 type: number
 *                 description: Monto del pago
 *                 format: float     
 *               payment_date:
 *                 type: string
 *                 description: Fecha de pago
 *                 format: date  
 *               payment_method:
 *                 type: string
 *                 description: Método de pago
 *               description:
 *                  type: string
 *                  description: Descripción x
 *     responses:
 *       200:
 *         description: Pago actualizado exitosamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:payment_id", paymentController.updatePayment);

/**
 * @swagger
 * /payments/{payment_id}:
 *   delete:
 *     summary: Elimina un pago por ID
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago eliminado exitosamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:payment_id", paymentController.deletePayment);

module.exports = router;