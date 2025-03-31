const express = require("express");
const router = express.Router();
const catalogController = require("../controllers/catalog.controller");

/**
 * @swagger
 * /catalogs:
 *   get:
 *     summary: Obtiene todos los elementos del catálogo
 *     tags: [Catalog]
 *     responses:
 *       200:
 *         description: Lista de elementos del catálogo
 *       500:
 *         description: Error al obtener los elementos del catálogo
 */
router.get("/", catalogController.getAllCatalogs);

/**
 * @swagger
 * /catalogs/{catalog_id}:
 *   get:
 *     summary: Obtiene un elemento del catálogo por ID
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: catalog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del elemento del catálogo
 *     responses:
 *       200:
 *         description: Elemento del catálogo encontrado
 *       404:
 *         description: Elemento del catálogo no encontrado
 *       500:
 *         description: Error al obtener el elemento del catálogo
 */
router.get("/:catalog_id", catalogController.getCatalogById);

/**
 * @swagger
 * /catalogs:
 *   post:
 *     summary: Crea un nuevo elemento del catálogo
 *     tags: [Catalog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               fabric:
 *                 type: integer
 *               type:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Elemento del catálogo creado exitosamente
 *       500:
 *         description: Error al crear el elemento del catálogo
 */
router.post("/", catalogController.createCatalog);

/**
 * @swagger
 * /catalogs/{catalog_id}:
 *   put:
 *     summary: Actualiza un elemento del catálogo por ID
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: catalog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del elemento del catálogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               fabric:
 *                 type: integer
 *               type:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Elemento del catálogo actualizado exitosamente
 *       404:
 *         description: Elemento del catálogo no encontrado
 *       500:
 *         description: Error al actualizar el elemento del catálogo
 */
router.put("/:catalog_id", catalogController.updateCatalog);

/**
 * @swagger
 * /catalogs/{catalog_id}:
 *   delete:
 *     summary: Elimina un elemento del catálogo por ID
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: catalog_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del elemento del catálogo
 *     responses:
 *       200:
 *         description: Elemento del catálogo eliminado exitosamente
 *       404:
 *         description: Elemento del catálogo no encontrado
 *       500:
 *         description: Error al eliminar el elemento del catálogo
 */
router.delete("/:catalog_id", catalogController.deleteCatalog);

module.exports = router;