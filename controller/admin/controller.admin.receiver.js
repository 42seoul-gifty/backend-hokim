const { getKoreaTime } = require("../../lib/lib.getKoreaTime");
const { getAges, getPrices, getGenders } = require("../../lib/lib.Preference");
const { Shipment } = require("../../config/constant");
const { Op } = require("sequelize");
const { Age, Price, Feature, Receiver, Product } = require("../../models");

const getReceiverPage = async (req, res) => {
  res.render("admin/shippingManage", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
  });
};

const getReceiverDetailPage = async (req, res) => {
  const ages = await getAges();
  const prices = await getPrices();

  const genders = await getGenders();
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
  res.render("admin/receiverDetail", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
    genders,
    ages,
    prices,
    receiver,
    shipments: Shipment,
  });
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

module.exports = {
  getReceiverPage,
  getReceiverDetailPage,
  getAdminFilterdReceiver,

  updateReceiverShipment,
  patchReceiverAdmin,
};
