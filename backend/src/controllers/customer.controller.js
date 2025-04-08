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