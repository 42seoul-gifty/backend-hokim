const { getKoreaTime } = require("../../lib/lib.getKoreaTime");
const { getAges, getPrices, getGenders } = require("../../lib/lib.Preference");
const { Shipment } = require("../../config/constant");
const { Op } = require("sequelize");
const { logger } = require("../../config/winston");
const { getTotalPage } = require("../../lib/lib.getTotalPage");

const { Sequelize, sequelize } = require("../../models");

const {
  Age,
  Price,
  Feature,
  Receiver,
  Product,
  Orders,
} = require("../../models");

const getReceiverPage = async (req, res) => {
  const page = req.query.page ? req.query.page : 0;

  res.render("admin/shippingManage", {
    layout: "layout/layout",
    page,
    user: req.user,
    value: req.query.value,
    order: req.query.order,
    csrfToken: req.csrfToken(),
  });
};

const getReceiverDetailPage = async (req, res) => {
  try {
    const ages = await getAges();
    const prices = await getPrices();

    const genders = await getGenders();
    const receiver = await Receiver.findOne({
      attributes: {
        include: [
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("Receiver.createdAt"),
              "%Y-%m-%d %H:%i"
            ),
            "createdAt",
          ],
        ],
      },
      include: [
        {
          model: Price,
          attributes: ["value"],
        },
        {
          model: Age,
          attributes: ["value"],
        },

        {
          model: Orders,
          attributes: ["user_id"],
        },
      ],
      where: { id: req.params.receiver_id },
      row: true,
    });

    res.render("admin/receiverDetail", {
      layout: "layout/layout",
      csrfToken: req.csrfToken(),
      genders,
      ages,
      prices,
      receiver,
      user: req.user,
      shipments: Shipment,
    });
  } catch (e) {
    logger.error(e);
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const getAdminFilterdReceiver = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 0;

    const limit = 15;

    const orderValue = [];
    if (req.query.value && req.query.order)
      orderValue.push([
        sequelize.literal(
          req.query.value == "product" ? "Product.name" : req.query.value
        ),
        req.query.order,
      ]);
    if (req.query.value && req.query.value != "id")
      orderValue.push([sequelize.literal("id"), "asc"]);

    const startDate =
      !req.body.start || req.body.start == ""
        ? new Date("1995-01-01")
        : req.body.start;
    const endDate =
      !req.body.end || req.body.end == "" ? getKoreaTime() : req.body.end;

    const receiver = await Receiver.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("Receiver.updatedAt"),
              "%Y-%m-%d %H:%i"
            ),
            "updatedAt",
          ],
        ],
      },
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

      order: orderValue,
      offset: page * limit,
      limit: limit,
      subQuery: false,
    });

    var totalPage = await getTotalPage(limit, Receiver, null, {
      createdAt: {
        [Op.lte]: endDate,
        [Op.gt]: startDate,
      },
    });

    res.status(200).json({ success: true, receiver, totalPage, page });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const updateReceiverShipment = async (req, res) => {
  try {
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

const patchReceiverAdmin = async (req, res) => {
  try {
    delete req.body._csrf;

    await Receiver.update(req.body, { where: { id: req.params.receiver_id } });

    res.status(200).json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: true, error: e.message });
  }
};

module.exports = {
  getReceiverPage,
  getReceiverDetailPage,
  getAdminFilterdReceiver,
  updateReceiverShipment,
  patchReceiverAdmin,
};
