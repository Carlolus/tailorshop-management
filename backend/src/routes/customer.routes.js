const express = require("express");
const router = express.Router();
const { Customer } = require("../models");

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
});

// Obtener un cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error });
  }
});

// Crear un cliente
router.post("/", async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el cliente", error });
  }
});

// Actualizar un cliente
router.put("/:id", async (req, res) => {
  try {
    const updated = await Customer.update(req.body, { where: { customer_id: req.params.id } }); // 👈 FIX: customer_id en vez de costumer_id
    if (updated[0] === 0) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el cliente", error });
  }
});

// Eliminar un cliente
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Customer.destroy({ where: { customer_id: req.params.id } }); // 👈 FIX: customer_id en vez de id
    if (deleted === 0) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
});

module.exports = router;