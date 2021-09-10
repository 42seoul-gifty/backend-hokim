const { findOrCreate } = require("../lib/lib.Preference");
const { findOneProduct, convertImageUrl } = require("../lib/lib.Product");
const { createReciever } = require("../lib/lib.Receiver");
const {
  Orders,
  Receiver,
  Product,
  Price,
  Age,
  Feature,
  ProductImage,
} = require("../models");

const getOrders = async (req, res) => {
  try {
    var orders = await Orders.findAll({
      include: [
        {
          model: Receiver,
          attributes: [
            "id",
            "name",
            "phone",
            "postcode",
            "address",
            "detail_address",
          ],
        },
      ],
      where: { user_id: req.params.user_id },
      attributes: [
        "giver_name",
        "giver_phone",
        ["createdAt", "order_date"],
        "payment_amount",
        "status",
      ],
    });

    orders = orders.map((order) => {
      order = order.toJSON();
      order["receiver"] = order.Receivers[0];
      delete order.Receivers;
      return order;
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
    var order = await Orders.findOne({
      include: [
        {
          model: Receiver,
          attributes: [
            "id",
            "name",
            "phone",
            "postcode",
            "address",
            "detail_address",
          ],
          include: [
            {
              model: Product,
              attributes: [
                "id",
                "name",
                "description",
                "detail",
                "thumbnail",
                ["retail_price", "price"],
              ],
              include: [{ model: ProductImage, attributes: ["image_url"] }],
              attributes: [
                "id",
                "name",
                "description",
                "detail",
                "thumbnail",
                ["retail_price", "price"],
              ],
            },
          ],
        },
      ],
      attributes: [
        "giver_name",
        "giver_phone",
        ["createdAt", "order_date"],
        "payment_amount",
        "status",
      ],
      where: { id: req.params.order_id, user_id: req.params.user_id },
    });
    order = order.toJSON();
    order["receiver"] = order.Receivers[0];
    delete order.Receivers;
    if (order.receiver.Product) convertImageUrl(order.receiver.Product);
    order.receiver["product"] = order.receiver.Product;

    delete order.receiver.Product;

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
    var price = await Price.findOne({
      id: req.body.price,
    });
    const order = await Orders.create({
      user_id: req.params.user_id,
      giver_name: req.body.giver_name,
      giver_phone: req.body.giver_phone,
      payment_amount: price.toJSON().retail_price,
      imp_uid: req.body.imp_uid,
    });
    await Receiver.create({
      name: req.body.receiver_name,
      phone: req.body.receiver_phone,
      order_id: order.toJSON().id,
      gender: req.body.gender,
      age_id: req.body.age,
      price_id: req.body.price,
    });

    res.status(200).json({
      success: true,
      merchant_uid: order.toJSON().id,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Orders.update(
      { deleted: true },
      {
        where: { id: req.params.order_id, user_id: req.params.user_id },
      }
    );

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
