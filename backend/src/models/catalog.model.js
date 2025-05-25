/*
  Title: catalog.controller.js
  Description: Controller for managing CRUD operations for the catalog items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting catalog items.
*/

const { Catalog } = require("../models");
const { logAudit } = require("../services/audit.service");

exports.getAllCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.findAll();
    res.json(catalogs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener items", error });
  }
};

exports.getCatalogById = async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.item_id);
    if (!catalog) return res.status(404).json({ message: "Item no encontrado" });
    res.json(catalog);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el item", error });
  }
};

exports.createCatalog = async (req, res) => {
  try {
    const newItem = await Catalog.create(req.body);

    if (!req.user) {
      console.warn("req.user está indefinido. ¿Falta el token?");
    }

    await logAudit({
      user: req.user,
      action: "create",
      entity: "catalog",
      entity_id: newItem.item_id,
      description: `Catalog item created with description "${newItem.description}"`
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el item", error });
  }
};

exports.updateCatalog = async (req, res) => {
  try {
    const { item_id } = req.params;
    const newData = req.body;

    const catalog = await Catalog.findByPk(item_id);
    if (!catalog) return res.status(404).json({ message: "Item no encontrado" });

    // Comparar cambios
    const changes = {};
    for (const key in newData) {
      if (catalog[key] !== undefined && catalog[key] !== newData[key]) {
        changes[key] = [catalog[key], newData[key]];
      }
    }

    console.log(changes);

    // Actualizar
    await catalog.update(newData);

    if (Object.keys(changes).length > 0) {
      await logAudit({
        user: req.user,
        action: "update",
        entity: "catalog",
        entity_id: catalog.item_id,
        description: `Catalog item "${catalog.item_id}" updated`,
        changes
      });
    }

    res.json({ message: "Item actualizado correctamente", catalog });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el item", error });
  }
};

exports.deleteCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.item_id);
    if (!catalog) return res.status(404).json({ message: "Item no encontrado" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "catalog",
      entity_id: catalog.item_id,
      description: `Catalog item with description "${catalog.description}" was deleted`
    });

    await catalog.destroy();
    res.json({ message: "Item eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el item", error });
  }
};
