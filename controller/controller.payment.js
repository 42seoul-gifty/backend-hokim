const axios = require("axios");
const { imp_config } = require("../config/config");
const { Orders } = require("../models");

const getIMPAccessToken = async () => {
  // 인증 토큰 발급
  const getToken = await axios({
    url: "https://api.iamport.kr/users/getToken",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: {
      imp_key: imp_config.key,
      imp_secret: imp_config.secret,
    },
  });
  return getToken.data.response.access_token;
};

const getIMPData = async (access_token, imp_uid) => {
  // 결제 정보 조회
  const getPaymentData = await axios({
    url: `https://api.iamport.kr/payments/${imp_uid}`,
    method: "get",
    headers: { Authorization: access_token },
  });
  return getPaymentData.data.response;
};

const refund = async (access_token, paymentData) => {
  // 환불
  const { imp_uid, amount, cancel_amount } = paymentData;
  const cancelableAmount = amount - cancel_amount;
  if (cancelableAmount <= 0) {
    return res.status(400).json({ message: "이미 전액환불된 주문입니다." });
  }

  const getCancelData = await axios({
    url: "https://api.iamport.kr/payments/cancel",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    data: {
      reason: "위조된 결제",
      imp_uid,
      amount: amount,
      checksum: cancelableAmount,
    },
  });
  return getCancelData.data;
};

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
      console.log(order);
      throw { status: "forgery", message: "위조된 결제시도" };
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

module.exports = {
  checkPaymentValidation,
};
