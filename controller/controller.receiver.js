const {
  findReceiverLikeProduct,
  findFilteredProduct,
  convertImageUrl,
} = require("../lib/lib.Product");
const {
  Receiver,
  ProductImage,
  Orders,
  Product,
  ProductGender,
  Price,
  Age,
} = require("../models");
const { getFilterdProduct } = require("./controller.product");

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

    receiver = receiver.toJSON();
    convertImageUrl(receiver.Product);
    receiver["product"] = receiver.Product;
    delete receiver.Product;
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
      include: [
        {
          model: Orders,
          attributes: ["giver_name", "giver_phone"],
        },
      ],
      where: { id: req.params.receiver_id },
    });
    receiver = receiver.toJSON();

    var products = await Product.findAll({
      include: [
        {
          model: ProductGender,
          attributes: [],
          where: receiver.gender ? { gender: receiver.gender } : {},
        },
        {
          model: Price,
          attributes: [],
          where: receiver.price_id ? { id: receiver.price_id } : {},
        },
        {
          model: Age,
          attributes: [],
          where: receiver.age_id ? { id: receiver.age_id } : {},
        },
        { model: ProductImage, attributes: ["image_url", "id"] },
      ],
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
    res.status(400).json({ success: false, error: e.message });
  }
};

const getReceiversLikes = async (req, res) => {
  try {
    var products = await findReceiverLikeProduct(req.params.receiver_id);
    //TODO: 삭제될수도?
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
    //TODO:수정이 필요할 수도 있음
    const receiver = [];
    await req.body.changed.forEach(async (element) => {
      receiver.push(
        await Receiver.update(
          { shipment_status: element.value },
          { where: { id: element.id } }
        )
      );
    });

    res.status(200).json({ success: true, receiver });
  } catch (e) {
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
