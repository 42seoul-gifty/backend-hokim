const { getIMPAccessToken, getIMPData } = require("../lib/lib.payment");
const { Orders } = require("../models");
const { logger } = require("../config/winston");

const checkPaymentValidation = async (req, res) => {
  var { merchant_uid, imp_uid } = req.body;
  try {
    const access_token = await getIMPAccessToken();
    const paymentData = await getIMPData(access_token, imp_uid);
    const { amount, status } = paymentData;

    const order = await Orders.findOne({
      where: { merchant_uid },
    });

    if (!order) throw new Error(`Order not Exist`);

    if (amount == order.toJSON().paid_amount) {
      await Orders.update(
        { status: "결제완료", imp_uid },
        { where: { merchant_uid } }
      );
      // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액

      switch (status) {
        case "ready": // 가상계좌 발급
          res.status(200).json({
            status: "vbankIssued",
            message: "가상계좌 서비스 안함",
          });
          break;
        case "paid": // 결제 완료
          res.status(200).json({
            status: "success",
            message: "일반 결제 성공",
          });
          break;
      }
    } else {
      // 결제금액 불일치. 위/변조 된 결제
      const order = await Orders.update(
        { status: "위조결제", imp_uid },
        { where: { merchant_uid } }
      );
      throw { status: "forgery", message: "위조된 결제시도" };
    }
  } catch (e) {
    logger.error(e);
    res.status(400).json(e);
  }
};

module.exports = {
  checkPaymentValidation,
};
