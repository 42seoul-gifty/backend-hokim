const { createReciever } = require("../lib/lib.Receiver");
const { Order } = require("../models");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.params.user_id },
    });

    res.status(200).json({
      success: true,
      order: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.order_id, user_id: req.params.user_id },
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const postOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user_id: req.params.user_id,
      giver_name: req.body.giver_name,
      giver_phone: req.body.giver_phone,
      price: req.body.price,
      imp_uid: req.body.imp_uid,
    });
    const receiver = await createReciever(
      req.body.receiver_name,
      req.body.receiver_phone,
      order.toJSON().id,
      req.body.gender,
      req.body.age,
      req.body.group_id,
      req.body.price
    );

    res.status(200).json({
      success: true,
      order,
      receiver,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.destroy({
      where: { id: req.params.order_id, user_id: req.params.user_id },
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  postOrder,
  getOrders,
  getOrderDetail,
  deleteOrder,
};
