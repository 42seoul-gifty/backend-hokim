const {
  findReceiverLikeProduct,
  findOneProduct,
  findFilteredProduct,
} = require("../lib/lib.Product");
const { Receiver, Preference, Order } = require("../models");

const getReceiver = async (req, res) => {
  try {
    var receiver = await Receiver.findOne({
      where: { id: req.params.receiver_id },
    });
    const product = await findOneProduct(receiver.product_id);
    receiver = receiver.toJSON();
    delete receiver.product_id;
    receiver["product"] = product;
    res.status(200).json({ success: true, data: receiver });
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

    const order = await Order.findOne({
      include: [{ model: Preference, as: "Preference" }],
      where: { id: receiver.order_id },
    });
    console.log(order.Preference.toJSON());

    const products = await findFilteredProduct(
      order.Preference.gender_id,
      order.Preference.age_id,
      order.Preference.price_id
    );

    res.status(200).json({
      success: true,
      data: {
        giver_name: order.giver_name,
        giver_phone: order.giver_phone,
        products,
      },
    });
  } catch (e) {
    res.status(400).json({ success: true, error: e.message });
  }
};

const getReceiversLikes = async (req, res) => {
  try {
    var products = await findReceiverLikeProduct(req.params.receiver_id);
    res.status(200).json({
      success: true,
      data: {
        products,
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
