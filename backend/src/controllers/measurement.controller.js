/*
  Title: measurements.controller.js
  Description: Controller for managing CRUD operations for measurements in the database.
*/

const { Measurement } = require("../models");
const { logAudit } = require("../services/audit.service");

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

    await logAudit({
      user: req.user,
      action: "create",
      entity: "measurement",
      entity_id: newMeasurement.garment_id,
      description: `Medida creada para la prenda ID ${newMeasurement.garment_id}`
    });

    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la medida", error });
  }
};

exports.updateMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ where: { garment_id: req.params.garment_id } });
    if (!measurement) return res.status(404).json({ message: "Medida no encontrada para la prenda" });

    const oldMeasures = measurement.measures;
    const newMeasures = req.body.measures;

    await measurement.update(req.body);

    if (oldMeasures !== newMeasures) {
      await logAudit({
        user: req.user,
        action: "update",
        entity: "measurement",
        entity_id: measurement.garment_id,
        description: `Medida actualizada para la prenda ID ${measurement.garment_id}`,
        changes: { measures: [oldMeasures, newMeasures] }
      });
    }

    res.json(measurement);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la medida", error });
  }
};

exports.deleteMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ where: { garment_id: req.params.garment_id } });
    if (!measurement) return res.status(404).json({ message: "Medida no encontrada para la prenda" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "measurement",
      entity_id: measurement.garment_id,
      description: `Medida eliminada para la prenda ID ${measurement.garment_id}`
    });

    await measurement.destroy();
    res.json({ message: "Medida eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la medida", error });
  }
};
