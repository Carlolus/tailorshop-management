/*
  Title: customer.controller.js
  Description: Controller for managing CRUD operations for the current model items in the database.
  Usage: This file contains functions to handle requests for creating, reading, updating, and deleting current model items.
  Each model contains a set of functions that correspond to the CRUD operations. Those functions are provided by 
  Sequelize, which is the ORM used in this application.
*/

const { Customer } = require("../models");
const { logAudit } = require('../services/audit.service');

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

    await logAudit({
      user: req.user,
      action: "create",
      entity: "customer",
      entity_id: newCustomer.customer_id,
      description: `Customer named "${newCustomer.name}" was created`
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el cliente", error });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.customer_id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });

    const newData = req.body;

    // Compare changes
    const changes = {};
    for (const key in newData) {
      if (customer[key] !== undefined && customer[key] !== newData[key]) {
        changes[key] = [customer[key], newData[key]];
      }
    }

    // Update client
    await customer.update(newData);

    // If there are changes save it
    if (Object.keys(changes).length > 0) {
      await logAudit({
        user: req.user,
        action: "update",
        entity: "customer",
        entity_id: customer.customer_id,
        description: `Customer named "${customer.name}" was updated`,
        changes
      });
    }

    res.json({ message: "Cliente actualizado correctamente", customer });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente", error });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.customer_id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "customer",
      entity_id: customer.customer_id,
      description: `Customer named "${customer.name}" was deleted`
    });

    await customer.destroy();

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};
