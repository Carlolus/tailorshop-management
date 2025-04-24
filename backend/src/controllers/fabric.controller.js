/*
  Title: fabric.controller.js
  Description: Controller for managing CRUD operations for the current model items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting current model items.
  Each model contains a set of functions that correspond to the CRUD operations. Those functions are provided by 
  Sequelize, which is the ORM used in this application.
*/

const { Fabric } = require("../models");

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
      res.status(201).json(newFabric);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la tela", error });
    }
  };
  
  exports.updateFabric = async (req, res) => {
    try {
      const fabric = await Fabric.findByPk(req.params.fabric_id);
      if (!fabric) return res.status(404).json({ message: "Tela no encontrada" });
  
      await fabric.update(req.body);
      res.json(fabric);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la tela", error });
    }
  };
  
  exports.deleteFabric = async (req, res) => {
    try {
      const fabric = await Fabric.findByPk(req.params.fabric_id);
      if (!fabric) return res.status(404).json({ message: "Tela no encontrada" });
  
      await fabric.destroy();
      res.json({ message: "Tela eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar tela", error });
    }
  };