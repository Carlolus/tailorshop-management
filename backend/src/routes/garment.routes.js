const express = require("express");
const router = express.Router();
const garmentController = require("../controllers/garment.controller");

/**
 * @swagger
 * /garments:
 *   get:
 *     summary: Obtiene todas las prendas
 *     tags: [Garment]
 *     responses:
 *       200:
 *         description: Lista de prendas
 *       500:
 *         description: Error al obtener las prendas
 */
router.get("/", garmentController.getAllGarments);

/**
 * @swagger
 * /garments/{garment_id}:
 *   get:
 *     summary: Obtiene una prenda por ID
 *     tags: [Garment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prenda
 *     responses:
 *       200:
 *         description: Prenda encontrada
 *       404:
 *         description: Prenda no encontrada
 *       500:
 *         description: Error al obtener la prenda
 */
router.get("/:garment_id", garmentController.getGarmentById);

/**
 * @swagger
 * /garments:
 *   post:
 *     summary: Crea una nueva prenda
 *     tags: [Garment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               garment_type_id:
 *                 type: integer
 *               fabric_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               person_name:
 *                 type: string
 *               details:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prenda creada exitosamente
 *       500:
 *         description: Error al crear la prenda
 */
router.post("/", garmentController.createGarment);

/**
 * @swagger
 * /garments/{id}:
 *   put:
 *     summary: Actualiza una prenda por ID
 *     tags: [Garment]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               order_id:
 *                 type: integer
 *               garment_type_id:
 *                 type: integer
 *               fabric_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               person_name:
 *                 type: string
 *               details:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prenda actualizada exitosamente
 *       404:
 *         description: Prenda no encontrada
 *       500:
 *         description: Error al actualizar la prenda
 */
router.put("/:garment_id", garmentController.updateGarment);

/**
 * @swagger
 * /garments/{id}:
 *   delete:
 *     summary: Elimina una prenda por ID
 *     tags: [Garment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prenda
 *     responses:
 *       200:
 *         description: Prenda eliminada exitosamente
 *       404:
 *         description: Prenda no encontrada
 *       500:
 *         description: Error al eliminar la prenda
 */
router.delete("/:garment_id", garmentController.deleteGarment);

module.exports = router;