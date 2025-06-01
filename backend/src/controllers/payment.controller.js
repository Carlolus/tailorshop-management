/*
  Title: payment.controller.js
  Description: Controller for managing CRUD operations for payments in the database.
*/
const { Payment, Order, Customer } = require("../models");
const { logAudit } = require("../services/audit.service");
const sequelize = require("../config/database");

exports.getAllPayments = async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.order_id) {
      whereClause.order_id = req.query.order_id;
    }

    const payments = await Payment.findAll({
      where: whereClause,
      include: {
        model: Order,
        as: "paymentOrder",
        include: {
          model: Customer,
          as: "orderCustomer",
          attributes: ["customer_id", "name"]
        }
      },
      order: [["payment_date", "DESC"]]
    });

    res.json(payments);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    res.status(500).json({ message: "Error al obtener los pagos", error: error.message });
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
  const t = await sequelize.transaction();
  try {
    const { order_id, amount, payment_date, payment_method, description } = req.body;

    const orderToUpdate = await Order.findByPk(order_id, { transaction: t });

    if (!orderToUpdate) {
      await t.rollback();
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Verify numbers
    const currentBalance = parseFloat(orderToUpdate.balance);
    const paymentAmount = parseFloat(amount);

    if (paymentAmount > currentBalance) {
      await t.rollback();
      return res.status(400).json({
        message: `El monto del pago (${paymentAmount}) excede el balance actual (${currentBalance}) de la orden.`,
      });
    }

    // Create payment
    const newPayment = await Payment.create(
      {
        order_id,
        amount,
        payment_date,
        payment_method,
        description,
      },
      { transaction: t }
    );

    // Update balance
    orderToUpdate.balance = currentBalance - paymentAmount;
    await orderToUpdate.save({ transaction: t });

    // Execute t
    await t.commit();

    // Save in logs
    await logAudit({
      user: req.user,
      action: "create",
      entity: "payment",
      entity_id: newPayment.payment_id,
      description: `Pago creado con ID ${newPayment.payment_id} para orden con ID ${order_id}`,
    });

    return res.status(201).json(newPayment);

  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: "Error al crear el pago", error });
  }
};


exports.updatePayment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const payment = await Payment.findByPk(req.params.payment_id, { transaction: t });
    if (!payment) {
      await t.rollback();
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    const order = await Order.findByPk(payment.order_id, { transaction: t });
    if (!order) {
      await t.rollback();
      return res.status(404).json({ message: "Orden asociada no encontrada" });
    }

    const oldAmount = parseFloat(payment.amount);
    const newAmount = parseFloat(req.body.amount);

    // Calcular nuevo balance
    const currentBalance = parseFloat(order.balance);
    const adjustedBalance = currentBalance + oldAmount - newAmount;

    if (adjustedBalance < 0) {
      await t.rollback();
      return res.status(400).json({ message: `El nuevo monto del pago excede el saldo disponible.` });
    }

    const beforeUpdate = { ...payment.dataValues };

    await payment.update(req.body, { transaction: t });
    await order.update({ balance: adjustedBalance }, { transaction: t });

    await t.commit();

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
    await t.rollback();
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
};

exports.deletePayment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const payment = await Payment.findByPk(req.params.payment_id, { transaction: t });
    if (!payment) {
      await t.rollback();
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    const order = await Order.findByPk(payment.order_id, { transaction: t });
    if (!order) {
      await t.rollback();
      return res.status(404).json({ message: "Orden asociada no encontrada" });
    }

    // Reintegrar monto al balance
    order.balance = parseFloat(order.balance) + parseFloat(payment.amount);
    await order.save({ transaction: t });

    await payment.destroy({ transaction: t });

    await t.commit();

    await logAudit({
      user: req.user,
      action: "delete",
      entity: "payment",
      entity_id: payment.payment_id,
      description: `Pago eliminado con ID ${payment.payment_id}`
    });

    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Error al eliminar el pago", error });
  }
};
