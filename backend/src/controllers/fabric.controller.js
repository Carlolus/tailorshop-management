/*
  Title: fabric.controller.js
  Description: Controller for managing CRUD operations for the current model items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting current model items.
  Each model contains a set of functions that correspond to the CRUD operations. Those functions are provided by 
  Sequelize, which is the ORM used in this application.
*/

const { Fabric } = require("../models");
const { logAudit } = require('../services/audit.service');

exports.getAllFabrics = async (req, res) => {
  try {
    const fabrics = await Fabric.findAll();
    res.json(fabrics);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener telas", error });
  }
};

exports.getFabricById = async (req, res) => {
  try {
    const fabric = await Fabric.findByPk(req.params.fabric_id);
    if (!fabric) return res.status(404).json({ message: "Tela no encontrado" });
    res.json(fabric);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tela", error });
  }
};

exports.createFabric = async (req, res) => {
  try {
    const newFabric = await Fabric.create(req.body);

    if (!req.user) {
      console.warn("req.user está indefinido. ¿Falta el token?");
    }

    await logAudit({
      user: req.user,
      action: "create",
      entity: "fabric",
      entity_id: newFabric.fabric_id,
      description: `Fabric named "${newFabric.fabric_name}" was created`
    });

    res.status(201).json(newFabric);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tela", error });
  }
};

exports.updateFabric = async (req, res) => {
  try {
    const { fabric_id } = req.params;
    const newData = req.body;

    const fabric = await Fabric.findByPk(fabric_id);
    if (!fabric) return res.status(404).json({ message: 'Fabric not found' });

    // Comparar cambios
    const changes = {};
    for (const key in newData) {
      if (fabric[key] !== undefined && fabric[key] !== newData[key]) {
        changes[key] = [fabric[key], newData[key]];
      }
    }

    console.log(changes);

    // Actualizar la tela
    await fabric.update(newData);

    // Registrar en bitácora si hay cambios
    if (Object.keys(changes).length > 0) {
      await logAudit({
        user: req.user,
        action: 'update',
        entity: 'fabric',
        entity_id: fabric.fabric_id,
        description: `Fabric named "${fabric.fabric_name}" was updated`,
        changes
      });
    }

    res.json({ message: 'Fabric updated successfully', fabric });
  } catch (error) {
    console.error('Error updating fabric:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteFabric = async (req, res) => {
  try {
    const fabric = await Fabric.findByPk(req.params.fabric_id);
    if (!fabric) return res.status(404).json({ message: "Tela no encontrada" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "fabric",
      entity_id: fabric.fabric_id,
      description: `Fabric named "${fabric.fabric_name}" was deleted`
    });
    await fabric.destroy();
    res.json({ message: "Tela eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tela", error });
  }
};