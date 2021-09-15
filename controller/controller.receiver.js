const {
  findReceiverLikeProduct,
  findFilteredProduct,
  convertImageUrl,
  productIncludeFilter,
} = require("../lib/lib.Product");
const {
  Receiver,
  ProductImage,
  Orders,
  Product,
  ProductGender,
  Gender,
  Price,
  Age,
  Likes,
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
    var receiver = await Receiver.update(
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
    res.status(400).json({ success: true, error: e.message });
  }
};

const patchReceiverAdmin = async (req, res) => {
  console.log(req.body);
  delete req.body._csrf;

  await Receiver.update(req.body, { where: { id: req.params.receiver_id } });

  try {
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
    res.status(400).json({ success: false, error: e.message });
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
  updateReceiverShipment,
  patchReceiverAdmin,
};
