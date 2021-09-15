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
} = require("../models");
const Sequelize = require("../models").Sequelize;
const { productIncludeMutipleFilter } = require("../lib/lib.Product");
const { getKoreaTime } = require("../lib/lib.getKoreaTime");
const sequelize = require("../models").sequelize;

const { Op } = require("sequelize");

const getAdminFilterdProduct = async (req, res) => {
  try {
    const include = productIncludeMutipleFilter(
      req.body.gender,
      req.body.price,
      req.body.age
    );
    include.push(
      { model: Brand, attributes: ["id", "value"] },
      { model: Category, attributes: ["id", "value"] }
    );

    const condition = req.body.category.map((elem) => {
      return { category_id: elem };
    });
    include.push(
      { model: Receiver, attributes: [] },
      { model: Likes, attributes: [] }
    );
    const products = await Product.findAll({
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
      include,
      group: ["Product.id"],
      where: condition.length == 0 ? {} : { [Op.or]: condition },
    });

    res.status(200).json({ success: true, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdUser = async (req, res) => {
  try {
    const orderValue = [];
    if (req.query.value && req.query.order)
      orderValue.push([sequelize.literal(req.query.value), req.query.order]);
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
      order: orderValue,
    });
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdReceiver = async (req, res) => {
  try {
    const startDate =
      !req.body.start || req.body.start == ""
        ? new Date("1995-01-01")
        : req.body.start;
    const endDate =
      !req.body.end || req.body.end == "" ? getKoreaTime() : req.body.end;

    const receiver = await Receiver.findAll({
      include: [
        { model: Price, attributes: ["id", "value"] },
        { model: Age, attributes: ["id", "value"] },
        { model: Product, attributes: ["id", "name"] },
        { model: Feature, attributes: ["id", "value"] },
      ],
      where: {
        createdAt: {
          [Op.lte]: endDate,
          [Op.gt]: startDate,
        },
      },
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
