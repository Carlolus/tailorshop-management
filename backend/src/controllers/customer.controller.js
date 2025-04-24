/*
  Title: customer.controller.js
  Description: Controller for managing CRUD operations for the current model items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting current model items.
  Each model contains a set of functions that correspond to the CRUD operations. Those functions are provided by 
  Sequelize, which is the ORM used in this application.
*/
const { Customer } = require("../models");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    console.log(req.params)
    const customer = await Customer.findByPk(req.params.customer_id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el cliente", error });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.customer_id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });

    await customer.update(req.body);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente", error });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.customer_id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });

    await customer.destroy();
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};