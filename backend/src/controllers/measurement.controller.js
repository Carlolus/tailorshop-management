const { Measurement } = require("../models");

exports.getAllMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.findAll();
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las medidas", error });
  }
};

exports.getMeasurementByGarmentId = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ where: { garment_id: req.params.garment_id } });
    if (!measurement) return res.status(404).json({ message: "Medida no encontrada para la prenda" });
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la medida", error });
  }
};

exports.createMeasurement = async (req, res) => {
  try {
    const newMeasurement = await Measurement.create(req.body);
    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la medida", error });
  }
};

exports.updateMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ where: { garment_id: req.params.garment_id } });
    if (!measurement) return res.status(404).json({ message: "Medida no encontrada para la prenda" });

    await measurement.update(req.body);
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la medida", error });
  }
};

exports.deleteMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ where: { garment_id: req.params.garment_id } });
    if (!measurement) return res.status(404).json({ message: "Medida no encontrada para la prenda" });

    await measurement.destroy();
    res.json({ message: "Medida eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la medida", error });
  }
};