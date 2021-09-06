const { findOrCreate } = require("../lib/lib.Preference");
const { findOneProduct } = require("../lib/lib.Product");
const { createReciever } = require("../lib/lib.Receiver");
const { Order, Receiver, Product, Preference } = require("../models");

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
    var order = await Order.findOne({
      include: [{ model: Preference, as: "Preference" }],
      where: { id: req.params.order_id, user_id: req.params.user_id },
    });
    var receiver = await Receiver.findOne({
      where: { order_id: req.params.order_id },
    });
    const product = await findOneProduct(receiver.product_id);
    const preference = {};

    order = order.toJSON();
    console.log(order);
    preference["age"] = [order.Preference.age_id];
    preference["price"] = order.Preference.price_id;
    preference["gender"] = [order.Preference.gender_id];

    receiver = receiver.toJSON();
    receiver["product"] = product;
    order["receiver"] = receiver;
    order["preference"] = preference;
    order["order_date"] = order.createdAt;
    delete order.Preference;
    delete order.createdAt;
    delete order.updatedAt;
    delete order.user_id;

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const postOrder = async (req, res) => {
  try {
    const preference = await findOrCreate(
      gender_id,
      age_id,
      group_id,
      price_id
    );
    const order = await Order.create({
      user_id: req.params.user_id,
      giver_name: req.body.giver_name,
      giver_phone: req.body.giver_phone,
      price: req.body.price,
      preference_id: preference.id,
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
