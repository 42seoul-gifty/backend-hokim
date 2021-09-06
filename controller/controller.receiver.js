const e = require("express");
const { findReceiverLikeProduct, addImageUrl } = require("../lib/lib.Product");
const { Receiver, Product, Order, LikeProduct } = require("../models");

const getReceiver = async (req, res) => {
  try {
    receiver = await Receiver.findOne({
      where: { id: req.params.receiver_id },
    });
    res.status(200).json({ success: true, receiver });
  } catch (e) {
    res.status(400).json({ success: true, error: e.message });
  }
};

const patchReceiver = async (req, res) => {
  try {
    await Receiver.update(
      {
        product_id: req.body.product_id,
        postcode: req.body.postcode,
        address: req.body.address,
        detailAddress: req.body.address_detail,
      },
      { where: { id: req.params.receiver_id } }
    );
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: true, error: e.message });
  }
};

const getReceiversChoice = async (req, res) => {
  try {
    var receiver = await Receiver.findOne({
      where: { id: req.params.receiver_id },
    });
    receiver = receiver.toJSON();
    const product = await Product.findOne({
      where: { id: receiver.product_id },
    });
    addImageUrl([product]);

    const order = await Order.findOne({
      where: { id: receiver.order_id },
    });
    res.status(200).json({
      success: true,
      data: {
        giver_name: order.giver_name,
        giver_phone: order.giver_phone,
        product,
      },
    });
  } catch (e) {
    res.status(400).json({ success: true, error: e.message });
  }
};

const getReceiversLikes = async (req, res) => {
  try {
    var product = await findReceiverLikeProduct(req.params.receiver_id);
    res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (e) {
    res.status(400).json({ success: true, error: e.message });
  }
};

const updateReceiverShipment = async (req, res) => {
  try {
    const receiver = [];
    await req.body.changed.forEach(async (element) => {
      receiver.push(
        await Receiver.update(
          { shipmentStatus: element.value },
          { where: { id: element.id } }
        )
      );
    });

    res.status(200).json({ success: true, receiver });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getReceiver,
  patchReceiver,
  getReceiversChoice,
  getReceiversLikes,
  updateReceiverShipment,
};
