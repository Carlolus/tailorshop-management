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