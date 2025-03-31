const { Payment } = require("../models");

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
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pago", error });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pago", error });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

    await payment.update(req.body);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

    await payment.destroy();
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error });
  }
};