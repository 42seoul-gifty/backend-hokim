const axios = require("axios");
const { imp_config, domain } = require("../config/config");

const { Orders } = require("../models");

const getIMPAccessToken = async () => {
  const getToken = await axios({
    url: "https://api.iamport.kr/users/getToken",
    method: "post", // POST method
    headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
    data: {
      imp_key: imp_config.key, // REST API 키
      imp_secret: imp_config.secret, // REST API Secret
    },
  });
  return getToken.data.response.access_token; // 인증 토큰
};

const getIMPData = async (access_token, imp_uid) => {
  const getPaymentData = await axios({
    url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
    method: "get", // GET method
    headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
  });
  return getPaymentData.data.response; // 조회한 결제 정보
};

const refund = async (access_token, paymentData) => {
  const { imp_uid, amount, cancel_amount } = paymentData; // 조회한 결제정보로부터 imp_uid, amount(결제금액), cancel_amount(환불된 총 금액) 추출
  const cancelableAmount = amount - cancel_amount; // 환불 가능 금액(= 결제금액 - 환불 된 총 금액) 계산
  if (cancelableAmount <= 0) {
    // 이미 전액 환불된 경우
    return res.status(400).json({ message: "이미 전액환불된 주문입니다." });
  }

  const getCancelData = await axios({
    url: "https://api.iamport.kr/payments/cancel", // 예: http://www.myservice.com/payments/cancel
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
    },
    data: {
      reason: "위조된 결제", // 가맹점 클라이언트로부터 받은 환불사유
      imp_uid, // imp_uid를 환불 `unique key`로 입력
      amount: amount, // 가맹점 클라이언트로부터 받은 환불금액
      checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
    },
  });
  return getCancelData.data; // 환불 결과
};

const checkPaymentValidation = async (req, res) => {
  var { merchant_uid, imp_uid } = req.body; // req의 body에서 imp_uid, merchant_uid 추출
  console.log(imp_uid, req.body.imp_uid);
  var access_token;
  var paymentData;
  try {
    //액세스 토큰(access token) 발급 받기
    access_token = await getIMPAccessToken();
    // imp_uid로 아임포트 서버에서 결제 정보 조회
    paymentData = await getIMPData(access_token, req.body.imp_uid);

    var order = await Orders.findOne({
      where: { id: req.body.merchant_uid },
    }); // DB에 결제 정보 저장
    order = order.toJSON();
    const { amount, status } = paymentData;

    if (amount == order.paid_amount) {
      await Orders.update(
        { status: "결제완료", imp_uid },
        { where: { id: merchant_uid } }
      );
      // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액

      switch (status) {
        case "ready": // 가상계좌 발급
          // 가상계좌 발급 안내 문자메시지 발송
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
        { where: { id: merchant_uid } }
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
