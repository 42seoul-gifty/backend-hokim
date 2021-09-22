const { getGenders } = require("../../lib/lib.Preference");
const Sequelize = require("../../models").Sequelize;
const {
  Product,
  Gender,
  ProductImage,
  Price,
  Age,
  Feature,
  Category,
  Brand,
  Likes,
} = require("../../models");

const getProductPage = async (req, res) => {
  const age = await Age.findAll({});
  const price = await Price.findAll({});
  const feature = await Feature.findAll({});
  const category = await Category.findAll({});
  const gender = await getGenders();

  const page = req.query.page ? req.query.page : 0;

  res.render("admin/productManage", {
    layout: "layout/layout",
    age,
    price,
    feature,
    category,
    user: req.user,
    csrfToken: req.csrfToken(),
    gender,
    page,
  });
};

const getProductDetailPage = async (req, res) => {
  try {
    const product = await Product.findOne({
      include: [
        { model: Gender, attributes: ["id", "value"] },
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
    res.render("admin/productDetail", {
      layout: "layout/layout",
      product: product,
      user: req.user,
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

  const gender = await getGenders();
  const product = await Product.findOne({
    include: [
      { model: Gender, attributes: ["id", "value"] },
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
    gender,
    user: req.user,

    csrfToken: req.csrfToken(),
  });
};

const getProductRegisterPage = async (req, res) => {
  const age = await Age.findAll({});
  const price = await Price.findAll({});
  const feature = await Feature.findAll({});
  const category = await Category.findAll({});

  const gender = await getGenders();
  res.render("admin/productRegister", {
    layout: "layout/layout",
    age,
    price,
    feature,
    user: req.user,
    csrfToken: req.csrfToken(),
    gender,
    category,
  });
};

module.exports = {
  getProductPage,
  getProductDetailPage,
  getProductEditPage,
  getProductRegisterPage,
};
