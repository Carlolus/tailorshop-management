const { Order } = require("../models");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las órdenes", error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    console.log(req.params)
    const order = await Order.findByPk(req.params.order_id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la orden", error });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden", error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.order_id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.order_id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    await order.destroy();
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error });
  }
};