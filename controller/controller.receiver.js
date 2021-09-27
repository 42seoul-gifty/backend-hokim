const { convertImageUrl, productIncludeFilter } = require("../lib/lib.Product");
const { Receiver, ProductImage, Orders, Product, Likes } = require("../models");
const { dataNotExist } = require("../lib/lib.checkError");
const { default: axios } = require("axios");
const { makeSignature } = require("../lib/lib.makeSigniture");
require("dotenv").config();
const { logger } = require("../config/winston");
const { convertReceiverResponse } = require("../lib/lib.receiver");

const getReceiver = async (req, res) => {
  try {
    var receiver = await Receiver.findOne({
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
      attributes: [
        "id",
        "name",
        "phone",
        "postcode",
        "address",
        "detail_address",
      ],
      where: { id: req.params.receiver_id },
    });

    if (!receiver) throw new Error(`Receiver not Exist`);

    receiver = convertReceiverResponse(receiver);
    res.status(200).json({ success: true, data: receiver });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const patchReceiver = async (req, res) => {
  try {
    await dataNotExist("Receiver", Receiver, { id: req.params.receiver_id });
    await Receiver.update(
      {
        product_id: req.body.product_id,
        postcode: req.body.postcode,
        address: req.body.address,
        detail_address: req.body.address_detail,
      },
      { where: { id: req.params.receiver_id } }
    );
    const likesData = req.body.likes.map((likeProduct) => {
      return {
        product_id: likeProduct,
        receiver_id: req.params.receiver_id,
        likes: true,
      };
    });
    const dislikesData = req.body.dislikes.map((dislikeProduct) => {
      return {
        product_id: dislikeProduct,
        receiver_id: req.params.receiver_id,
        likes: false,
      };
    });

    await Likes.bulkCreate(likesData);
    await Likes.bulkCreate(dislikesData);

    res.status(200).json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getReceiversChoice = async (req, res) => {
  try {
    var receiver = await Receiver.findOne({
      include: [
        {
          model: Orders,
          attributes: ["giver_name", "giver_phone"],
        },
      ],
      where: { id: req.params.receiver_id },
    });
    if (!receiver) throw new Error(`Receiver not Exist`);
    receiver = receiver.toJSON();

    const include = productIncludeFilter(
      receiver.gender_id,
      receiver.price_id,
      receiver.age_id
    );
    var products = await Product.findAll({
      include,
      attributes: [
        "id",
        "name",
        "description",
        "detail",
        "thumbnail",
        ["retail_price", "price"],
      ],
    });
    products = products.map((product) => {
      product = product.toJSON();
      convertImageUrl(product);
      return product;
    });

    const data = receiver.Order;
    data["products"] = products;
    res.status(200).json({ success: true, data });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const sendSMS = async (req, res) => {
  try {
    const time = Date.now().toString();
    var receiver = await Receiver.findOne({
      include: [{ model: Orders, attributes: ["giver_name"] }],
      where: { id: req.params.receiver_id },
    });
    if (!receiver) throw new Error("Receiver not Exist");
    if (!receiver.phone || receiver.phone.length < 11)
      throw new Error("Invalid receiver phone number");
    receiver = receiver.toJSON();
    const message = {
      type: "SMS",
      countryCode: "82",
      from: `${process.env.SMS_NUMBER}`,
      content: `[gifty] ${receiver.Order.giver_name}님께서 보내신 선물이 도착했습니다.`,
      messages: [
        {
          to: receiver.phone,
        },
      ],
    };

    await axios({
      url: `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SMS_ID}/messages`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ncp-apigw-timestamp": time,
        "x-ncp-iam-access-key": `${process.env.SMS_ACCESS_KEY_ID}`,
        "x-ncp-apigw-signature-v2": makeSignature(time),
      },
      data: message,
    });

    res.status(200).json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getReceiver,
  patchReceiver,
  getReceiversChoice,
  sendSMS,
};
