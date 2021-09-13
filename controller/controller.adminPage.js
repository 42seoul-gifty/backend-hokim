const { Gender, Shipment } = require("../config/constant");
const {
  Product,
  ProductGender,
  ProductImage,
  Price,
  Age,
  Feature,
  Category,
  Brand,
  Likes,
  User,
  Orders,
  Receiver,
} = require("../models");
const Sequelize = require("../models").Sequelize;

const { getAges, getPrices } = require("../lib/lib.Preference");

const getAppPage = async (req, res) => {
  res.render("admin/appManage", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
    data: {
      gender: Gender,
    },
  });
};

const getProductPage = async (req, res) => {
  const age = await Age.findAll({});
  const price = await Price.findAll({});
  const feature = await Feature.findAll({});
  const category = await Category.findAll({});

  res.render("admin/productManage", {
    layout: "layout/layout",
    age,
    price,
    feature,
    category,
    csrfToken: req.csrfToken(),
    gender: Gender,
  });
};

const getProductDetailPage = async (req, res) => {
  try {
    const product = await Product.findOne({
      include: [
        { model: ProductGender, attributes: ["id", "gender"] },
        { model: Price, attributes: ["id", "value"] },
        { model: Age, attributes: ["id", "value"] },
        { model: Feature, attributes: ["id", "value"] },
        { model: Brand, attributes: ["id", "value"] },
        { model: Category, attributes: ["id", "value"] },
        { model: ProductImage, attributes: ["image_url"] },
      ],
      where: { id: req.params.product_id },
    });
    const count = await Product.findOne({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("Likes.likes")), "view_count"],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal("CASE WHEN Likes.likes = 1 THEN 1 ELSE 0 END")
          ),
          "like_count",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal("CASE WHEN Likes.likes = 0 THEN 1 ELSE 0 END")
          ),
          "dislike_count",
        ],
      ],

      include: [{ model: Likes, attributes: [] }],
      where: { id: req.params.product_id },
      group: ["Product.id"],
      distinct: true,
    });
    console.log(count.toJSON());
    res.render("admin/productDetail", {
      layout: "layout/layout",
      product: product,
      count: count.toJSON(),
      csrfToken: req.csrfToken(),
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
};

const getProductEditPage = async (req, res) => {
  const age = await Age.findAll({});
  const price = await Price.findAll({});
  const feature = await Feature.findAll({});
  const category = await Category.findAll({});
  const product = await Product.findOne({
    include: [
      { model: ProductGender, attributes: ["id", "gender"] },
      { model: Price, attributes: ["id", "value"] },
      { model: Age, attributes: ["id", "value"] },
      { model: Feature, attributes: ["id", "value"] },
      { model: Brand, attributes: ["id", "value"] },
      { model: Category, attributes: ["id", "value"] },
      { model: ProductImage, attributes: ["image_url", "id"] },
    ],
    where: { id: req.params.product_id },
  });

  res.render("admin/productEdit", {
    layout: "layout/layout",
    product: product,
    age,
    price,
    feature,
    category,
    gender: Gender,

    csrfToken: req.csrfToken(),
  });
};

const getUserDetailPage = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.user_id } });
  const orders = await Orders.findAll({
    attributes: {
      include: [
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("Orders.createdAt"),
            "%Y-%m-%d %H:%i"
          ),
          "createdAt",
        ],
      ],
    },
    where: { user_id: req.params.user_id },
  });
  res.render("admin/userDetail", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
    user,
    orders,
  });
};

const getUserPage = async (req, res) => {
  res.render("admin/userManage", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
  });
};

const getReceiverPage = async (req, res) => {
  res.render("admin/shippingManage", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
  });
};

const getProductRegisterPage = async (req, res) => {
  const age = await Age.findAll({});
  const price = await Price.findAll({});
  const feature = await Feature.findAll({});
  const category = await Category.findAll({});
  res.render("admin/productRegister", {
    layout: "layout/layout",
    age,
    price,
    feature,
    csrfToken: req.csrfToken(),
    gender: Gender,
    category,
  });
};

const getOrderDetailPage = async (req, res) => {
  const order = await Orders.findOne({
    attributes: {
      include: [
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("Orders.createdAt"),
            "%Y-%m-%d %H:%i"
          ),
          "createdAt",
        ],
      ],
    },
    where: { id: req.params.order_id },
  });

  const receivers = await Receiver.findAll({
    include: [
      {
        model: Price,
        attributes: ["value"],
      },
      {
        model: Age,
        attributes: ["value"],
      },
    ],
    where: { order_id: req.params.order_id },
    row: true,
  });
  console.log(receivers);
  res.render("admin/orderDetail", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
    order,
    receivers,
  });
};

const getReceiverDetailPage = async (req, res) => {
  const ages = await getAges();
  const prices = await getPrices();
  const receiver = await Receiver.findOne({
    include: [
      {
        model: Price,
        attributes: ["value"],
      },
      {
        model: Age,
        attributes: ["value"],
      },
    ],
    where: { id: req.params.receiver_id },
    row: true,
  });
  console.log(Shipment);
  res.render("admin/receiverDetail", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
    genders: Gender,
    ages,
    prices,
    receiver,
    shipments: Shipment,
  });
};

module.exports = {
  getProductDetailPage,
  getAppPage,
  getUserPage,
  getUserDetailPage,
  getProductPage,
  getReceiverPage,
  getProductEditPage,
  getProductRegisterPage,
  getOrderDetailPage,
  getReceiverDetailPage,
};
