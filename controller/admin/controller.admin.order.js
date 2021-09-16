const Sequelize = require("../../models").Sequelize;
const { Price, Age, Orders, Receiver } = require("../../models");

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
  res.render("admin/orderDetail", {
    layout: "layout/layout",
    csrfToken: req.csrfToken(),
    order,
    receivers,
  });
};
const deleteOrder = async (req, res) => {
  try {
    await Orders.update(
      { deleted: true },
      {
        where: { id: req.params.order_id, user_id: req.params.user_id },
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};
module.exports = {
  getOrderDetailPage,
  deleteOrder,
};
