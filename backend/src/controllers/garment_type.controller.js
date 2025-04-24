/*
  Title: garment_type.controller.js
  Description: Controller for managing CRUD operations for the current model items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting current model items.
  Each model contains a set of functions that correspond to the CRUD operations. Those functions are provided by 
  Sequelize, which is the ORM used in this application.
*/

const { GarmentType } = require("../models");

exports.getAllGarmentType = async (req, res) => {
  try {
    const garmenttype = await GarmentType.findAll();
    res.json(garmenttype);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tipo de prendas", error });
  }
};

exports.getGarmentTypeById = async (req, res) => {
  try {
    const garmenttype = await GarmentType.findByPk(req.params.garment_type_id);
    if (!garmenttype) return res.status(404).json({ message: "tipo de prenda no encontrado" });
    res.json(garmenttype);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tipo de prenda", error });
  }
};

exports.createGarmentType = async (req, res) => {
  try {
    const newGarmentType = await GarmentType.create(req.body);
    res.status(201).json(newGarmentType);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el tipo de prenda", error });
  }
};

exports.updateGarmentType = async (req, res) => {
  try {
    const garmenttype = await GarmentType.findByPk(req.params.garment_type_id);
    if (!garmenttype) return res.status(404).json({ message: "Tipo de prenda no encontrado" });

    await garmenttype.update(req.body);
    res.json(garmenttype);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el tipo de prenda", error });
  }
};

exports.deleteGarmentType = async (req, res) => {
  try {
    const garmenttype = await GarmentType.findByPk(req.params.garment_type_id);
    if (!garmenttype) return res.status(404).json({ message: "Tipo de prenda no encontrado" });

    await garmenttype.destroy();
    res.json({ message: "Tipo de prenda eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tipo de prenda", error });
  }
};