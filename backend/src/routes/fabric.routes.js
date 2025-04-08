const express = require("express");
const router = express.Router();
const fabricController = require("../controllers/fabric.controller");

/**
 * @swagger
 * /fabrics:
 *   get:
 *     summary: Obtiene todos los tipos de telas
 *     tags: [Fabric]
 *     responses:
 *       200:
 *         description: Lista de tipos de telas
 *       500:
 *         description: Error al obtener los tipos de telas
 */
router.get("/", fabricController.getAllFabrics);

/**
 * @swagger
 * /fabrics/{fabric_id}:
 *   get:
 *     summary: Obtiene un tipo de tela por ID
 *     tags: [Fabric]
 *     parameters:
 *       - in: path
 *         name: fabric_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de tela
 *     responses:
 *       200:
 *         description: Tipo de tela encontrado
 *       404:
 *         description: Tipo de tela no encontrado
 *       500:
 *         description: Error al obtener el tipo de tela
 */
router.get("/:fabric_id", fabricController.getFabricById);

/**
 * @swagger
 * /fabrics:
 *   post:
 *     summary: Crea un nuevo tipo de tela
 *     tags: [Fabric]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de tela creado exitosamente
 *       500:
 *         description: Error al crear el tipo de tela
 */
router.post("/", fabricController.createFabric);

/**
 * @swagger
 * /fabrics/{fabric_id}:
 *   put:
 *     summary: Actualiza un tipo de tela por ID
 *     tags: [Fabric]
 *     parameters:
 *       - in: path
 *         name: fabric_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de tela
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de tela actualizado exitosamente
 *       404:
 *         description: Tipo de tela no encontrado
 *       500:
 *         description: Error al actualizar el tipo de tela
 */
router.put("/:fabric_id", fabricController.updateFabric);

/**
 * @swagger
 * /fabrics/{fabric_id}:
 *   delete:
 *     summary: Elimina un tipo de tela por ID
 *     tags: [Fabric]
 *     parameters:
 *       - in: path
 *         name: fabric_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de tela
 *     responses:
 *       200:
 *         description: Tipo de tela eliminado exitosamente
 *       404:
 *         description: Tipo de tela no encontrado
 *       500:
 *         description: Error al eliminar el tipo de tela
 */
router.delete("/:fabric_id", fabricController.deleteFabric);

module.exports = router;