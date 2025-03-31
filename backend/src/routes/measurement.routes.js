const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurement.controller");

/**
 * @swagger
 * /measurements:
 *   get:
 *     summary: Obtiene todas las medidas
 *     tags:
 *       - Measurements
 *     responses:
 *       200:
 *         description: Lista de medidas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", measurementController.getAllMeasurements);

/**
 * @swagger
 * /measurements/{garment_id}:
 *   get:
 *     summary: Obtiene las medidas de una prenda específica por ID
 *     tags:
 *       - Measurements
 *     parameters:
 *       - in: path
 *         name: garment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prenda
 *     responses:
 *       200:
 *         description: Medidas obtenidas exitosamente
 *       404:
 *         description: Medidas no encontradas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:garment_id", measurementController.getMeasurementByGarmentId);

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Crea una nueva medida
 *     tags:
 *       - Measurements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               garment_id:
 *                 type: integer
 *                 description: ID de la prenda
 *               measurement_data:
 *                 type: object
 *                 description: Datos de la medida
 *             required:
 *               - garment_id
 *               - measurement_data
 *     responses:
 *       201:
 *         description: Medida creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", measurementController.createMeasurement);

/**
 * @swagger
 * /measurements/{garment_id}:
 *   put:
 *     summary: Actualiza las medidas de una prenda específica por ID
 *     tags:
 *       - Measurements
 *     parameters:
 *       - in: path
 *         name: garment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               measurement_data:
 *                 type: object
 *                 description: Datos actualizados de la medida
 *     responses:
 *       200:
 *         description: Medida actualizada exitosamente
 *       404:
 *         description: Medida no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:garment_id", measurementController.updateMeasurement);

/**
 * @swagger
 * /measurements/{garment_id}:
 *   delete:
 *     summary: Elimina las medidas de una prenda específica por ID
 *     tags:
 *       - Measurements
 *     parameters:
 *       - in: path
 *         name: garment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prenda
 *     responses:
 *       200:
 *         description: Medida eliminada exitosamente
 *       404:
 *         description: Medida no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:garment_id", measurementController.deleteMeasurement);

module.exports = router;