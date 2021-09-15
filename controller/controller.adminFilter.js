const {
  User,
  Receiver,
  Product,
  Price,
  Age,
  Feature,
  Brand,
  Category,
  Orders,
  Likes,
  ProductImage,
} = require("../models");
const Sequelize = require("../models").Sequelize;
const { productIncludeMutipleFilter } = require("../lib/lib.Product");
const { Op } = require("sequelize");

const getAdminFilterdProduct = async (req, res) => {
  try {
    const include = productIncludeMutipleFilter(
      req.body.gender,
      req.body.price,
      req.body.age
    );
    const condition = req.body.category.map((elem) => {
      return { category_id: elem };
    });

    console.log(condition);
    include.push(
      { model: Brand, attributes: ["id", "value"] },
      { model: Category, attributes: ["id", "value"] }
    );
    const products = await Product.findAll({
      include,
      group: ["Product.id"],
      where: condition.length == 0 ? {} : { [Op.or]: condition },
    });

    const count = await Product.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("Likes.likes")), "view_count"],
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal("CASE WHEN Likes.likes = 1 THEN 1 ELSE 0 END")
            ),
            "like_count",
          ],

          "id",
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                "CASE WHEN Receivers.product_id is not null THEN 1 ELSE 0 END"
              )
            ),
            "order_count",
          ],
        ],
      },
      include: [
        { model: ProductImage, attributes: ["image_url", "id"] },
        { model: Receiver, attributes: [] },
        { model: Likes, attributes: [] },
      ],
      group: ["Product.id"],
    });

    res.status(200).json({ success: true, products, count });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("User.createdAt"),
              "%Y-%m-%d %H:%i"
            ),
            "createdAt",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("Orders.user_id")),
            "order_count",
          ],
          [
            Sequelize.fn("SUM", Sequelize.col("Orders.paid_amount")),
            "order_amount",
          ],
        ],
      },
      include: [
        {
          model: Orders,
          attributes: [],
        },
      ],
      group: ["User.id"],
      raw: true,
    });
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdReceiver = async (req, res) => {
  try {
    const receiver = await Receiver.findAll({
      include: [
        { model: Price, attributes: ["id", "value"] },
        { model: Age, attributes: ["id", "value"] },
        { model: Product, attributes: ["id", "name"] },
        { model: Feature, attributes: ["id", "value"] },
      ],
    });
    res.status(200).json({ success: true, receiver });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAdminFilterdProduct,
  getAdminFilterdUser,
  getAdminFilterdReceiver,
};
