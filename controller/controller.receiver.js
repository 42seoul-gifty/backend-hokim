const e = require("express");
const { Receiver } = require("../models");

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

module.exports = {
  getReceiver,
  patchReceiver,
};
