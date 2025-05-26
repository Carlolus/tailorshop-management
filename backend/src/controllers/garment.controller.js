/*
  Title: garment.controller.js
  Description: Controller for managing CRUD operations for garments in the database.
*/

const { Garment } = require("../models");
const { logAudit } = require("../services/audit.service");

exports.getAllGarments = async (req, res) => {
  try {
    const garments = await Garment.findAll();
    res.json(garments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener prendas", error });
  }
};

exports.getGarmentById = async (req, res) => {
  try {
    const garment = await Garment.findByPk(req.params.garment_id);
    if (!garment) return res.status(404).json({ message: "Prenda no encontrada" });
    res.json(garment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la prenda", error });
  }
};

exports.createGarment = async (req, res) => {
  try {
    const newGarment = await Garment.create(req.body);

    await logAudit({
      user: req.user,
      action: "create",
      entity: "garment",
      entity_id: newGarment.garment_id,
      description: `Prenda creada con ID ${newGarment.garment_id}`
    });

    res.status(201).json(newGarment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la prenda", error });
  }
};

exports.updateGarment = async (req, res) => {
  try {
    const garment = await Garment.findByPk(req.params.garment_id);
    if (!garment) return res.status(404).json({ message: "Prenda no encontrada" });

    const beforeUpdate = { ...garment.dataValues };

    await garment.update(req.body);

    const updatedFields = {};
    for (const key of Object.keys(req.body)) {
      if (beforeUpdate[key] !== req.body[key]) {
        updatedFields[key] = [beforeUpdate[key], req.body[key]];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      await logAudit({
        user: req.user,
        action: "update",
        entity: "garment",
        entity_id: garment.garment_id,
        description: `Prenda actualizada con ID ${garment.garment_id}`,
        changes: updatedFields
      });
    }

    res.json(garment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la prenda", error });
  }
};

exports.deleteGarment = async (req, res) => {
  try {
    const garment = await Garment.findByPk(req.params.garment_id);
    if (!garment) return res.status(404).json({ message: "Prenda no encontrada" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "garment",
      entity_id: garment.garment_id,
      description: `Prenda eliminada con ID ${garment.garment_id}`
    });

    await garment.destroy();
    res.json({ message: "Prenda eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la prenda", error });
  }
};
