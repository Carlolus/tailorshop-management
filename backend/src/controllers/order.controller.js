/*
  Title: order.controller.js
  Description: Controller for managing CRUD operations for orders in the database.
*/

const { Order } = require("../models");
const { logAudit } = require("../services/audit.service");
const { Op } = require("sequelize");

exports.getAllOrders = async (req, res) => {
  const whereClause = {};
  try {
    if (req.query.year && req.query.month) {
      const year = parseInt(req.query.year);
      const month = parseInt(req.query.month);

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      whereClause.order_date = {
        [Op.gte]: startDate,
        [Op.lt]: endDate
      };
    }

    const orders = await Order.findAll({
      where: whereClause,
      order: [["order_date", "DESC"]]
    });

    res.json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes", error: error.message });
  }
};

exports.countOrders = async (req, res) => {
  try {
    const whereClause = {};

    if (req.query.year && req.query.month) {
      const year = parseInt(req.query.year);
      const month = parseInt(req.query.month);

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      whereClause.order_date = {
        [Op.gte]: startDate,
        [Op.lt]: endDate
      };
    }

    if (req.query.status) {
      const allowedStatuses = ["pendiente", "en proceso", "terminado", "entregado"];
      if (allowedStatuses.includes(req.query.status)) {
        whereClause.status = req.query.status;  // igualdad exacta
      } else {
        return res.status(400).json({ message: "Status inválido" });
      }
    }

    const count = await Order.count({
      where: whereClause
    });

    res.json({ totalOrders: count });
  } catch (error) {
    console.error("Error al contar las órdenes:", error);
    res.status(500).json({ message: "Error al contar las órdenes", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
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

    if (!req.user) {
      console.warn("req.user está indefinido. ¿Falta middleware de autenticación?");
    }

    await logAudit({
      user: req.user,
      action: "create",
      entity: "order",
      entity_id: newOrder.order_id,
      description: `Orden creada para el cliente ID ${newOrder.customer_id} con fecha de entrega ${newOrder.delivery_date}`
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden", error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const newData = req.body;

    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    // Detectar cambios
    const changes = {};
    for (const key in newData) {
      if (order[key] !== undefined && order[key] !== newData[key]) {
        changes[key] = [order[key], newData[key]];
      }
    }

    await order.update(newData);

    if (Object.keys(changes).length > 0) {
      await logAudit({
        user: req.user,
        action: "update",
        entity: "order",
        entity_id: order.order_id,
        description: `Orden ${order.order_id} actualizada`,
        changes
      });
    }

    res.json({ message: "Orden actualizada correctamente", order });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.order_id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "order",
      entity_id: order.order_id,
      description: `Orden para el cliente ID ${order.customer_id} fue eliminada`
    });

    await order.destroy();
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error });
  }
};
