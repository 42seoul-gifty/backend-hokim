const { Gender } = require("../config/constant");
const {
  Product,
  ProductGender,
  ProductImage,
  Price,
  Age,
  Feature,
  Category,
  Brand,
} = require("../models");

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

    res.render("admin/productDetail", {
      layout: "layout/layout",
      product: product,
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

module.exports = {
  getProductDetailPage,
  getAppPage,
  getUserPage,
  getProductPage,
  getReceiverPage,
  getProductEditPage,
  getProductRegisterPage,
};
