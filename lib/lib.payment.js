const axios = require("axios");
const { imp_config } = require("../config/config");

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

module.exports = { getIMPAccessToken, getIMPData, refund };
