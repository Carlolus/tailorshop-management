const { Garment } = require("../models");

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
    const garment = await Garment.findByPk(req.params.id);
    if (!garment) return res.status(404).json({ message: "Prenda no encontrada" });
    res.json(garment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la prenda", error });
  }
};

exports.createGarment = async (req, res) => {
  try {
    const newGarment = await Garment.create(req.body);
    res.status(201).json(newGarment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la prenda", error });
  }
};

exports.updateGarment = async (req, res) => {
  try {
    const garment = await Garment.findByPk(req.params.id);
    if (!garment) return res.status(404).json({ message: "Prenda no encontrada" });

    await garment.update(req.body);
    res.json(garment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la prenda", error });
  }
};

exports.deleteGarment = async (req, res) => {
  try {
    const garment = await Garment.findByPk(req.params.id);
    if (!garment) return res.status(404).json({ message: "Prenda no encontrada" });

    await garment.destroy();
    res.json({ message: "Prenda eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la prenda", error });
  }
};