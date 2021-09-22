const Sequelize = require("../../models").Sequelize;
const { Price, Age, Orders, Receiver, Product } = require("../../models");
const { getIMPAccessToken, getIMPData } = require("../../lib/lib.payment");

function Unix_timestamp(time) {
  var date = new Date(time * 1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  return (
    year +
    "-" +
    month.substr(-2) +
    "-" +
    day.substr(-2) +
    " " +
    hour.substr(-2) +
    ":" +
    minute.substr(-2) +
    ":" +
    second.substr(-2)
  );
}

const getOrderDetailPage = async (req, res) => {
  try {
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

        { model: Product, attributes: ["id", "name"] },
      ],
      where: { order_id: req.params.order_id },
      row: true,
    });
    const access_token = await getIMPAccessToken();
    const paymentData = await getIMPData(access_token, order.imp_uid);

    const paidData = {
      provider: paymentData.emb_pg_provider,
      status: paymentData.status,
      paid_at: Unix_timestamp(paymentData.paid_at),
    };

    res.render("admin/orderDetail", {
      layout: "layout/layout",
      csrfToken: req.csrfToken(),
      order,
      receivers,
      paidData,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
};
const deleteAdminOrder = async (req, res) => {
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
  deleteAdminOrder,
};
