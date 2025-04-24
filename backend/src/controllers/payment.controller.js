/*
  Title: payment.controller.js
  Description: Controller for managing CRUD operations for the current model items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting current model items.
  Each model contains a set of functions that correspond to the CRUD operations. Those functions are provided by 
  Sequelize, which is the ORM used in this application.
*/
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
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pago", error });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.payment_id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

    await payment.update(req.body);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.payment_id);
    if (!payment) return res.status(404).json({ message: "Pago no encontrado" });

    await payment.destroy();
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error });
  }
};