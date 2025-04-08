const express = require("express");
const router = express.Router();
const garmentTypeController = require("../controllers/garment_type.controller");

/**
 * @swagger
 * /garmentstypes:
 *   get:
 *     summary: Obtiene todos los tipos de prendas
 *     tags:
 *       - Garment Types
 *     responses:
 *       200:
 *         description: Lista de tipos de prendas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", garmentTypeController.getAllGarmentType);

/**
 * @swagger
 * /garmentstypes/{garment_type_id}:
 *   get:
 *     summary: Obtiene un tipo de prenda por ID
 *     tags:
 *       - Garment Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de prenda
 *     responses:
 *       200:
 *         description: Tipo de prenda obtenido exitosamente
 *       404:
 *         description: Tipo de prenda no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:garment_type_id", garmentTypeController.getGarmentTypeById);

/**
 * @swagger
 * /garmentstypes:
 *   post:
 *     summary: Crea un nuevo tipo de prenda
 *     tags:
 *       - Garment Types
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del tipo de prenda
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Tipo de prenda creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", garmentTypeController.createGarmentType);

/**
 * @swagger
 * /garmentstypes/{garment_type_id}:
 *   put:
 *     summary: Actualiza un tipo de prenda por ID
 *     tags:
 *       - Garment Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de prenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del tipo de prenda
 *     responses:
 *       200:
 *         description: Tipo de prenda actualizado exitosamente
 *       404:
 *         description: Tipo de prenda no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:garment_type_id", garmentTypeController.updateGarmentType);

/**
 * @swagger
 * /garmentstypes/{garment_type_id}:
 *   delete:
 *     summary: Elimina un tipo de prenda por ID
 *     tags:
 *       - Garment Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de prenda
 *     responses:
 *       200:
 *         description: Tipo de prenda eliminado exitosamente
 *       404:
 *         description: Tipo de prenda no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:garment_type_id", garmentTypeController.deleteGarmentType);

module.exports = router;