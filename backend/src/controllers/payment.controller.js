/*
  Title: payment.controller.js
  Description: Controller for managing CRUD operations for payments in the database.
*/

const { Payment } = require("../models");
const { logAudit } = require("../services/audit.service");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pagos", error });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.payment_id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pago", error });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);

    await logAudit({
      user: req.user,
      action: "create",
      entity: "payment",
      entity_id: newPayment.payment_id,
      description: `Pago creado con ID ${newPayment.payment_id}`
    });

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pago", error });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.payment_id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

    const beforeUpdate = { ...payment.dataValues };

    await payment.update(req.body);

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
        entity: "payment",
        entity_id: payment.payment_id,
        description: `Pago actualizado con ID ${payment.payment_id}`,
        changes: updatedFields
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.payment_id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "payment",
      entity_id: payment.payment_id,
      description: `Pago eliminado con ID ${payment.payment_id}`
    });

    await payment.destroy();
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error });
  }
};
