const axios = require("axios");
const { imp_config, domain } = require("../config/config");

const { Order } = require("../models");

const checkPaymentValidation = async (req, res) => {
  try {
    var { imp_uid, merchant_uid } = req.body; // req의 body에서 imp_uid, merchant_uid 추출
    //액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: imp_config.key, // REST API 키
        imp_secret: imp_config.secret, // REST API Secret
      },
    });
    const { access_token } = getToken.data.response; // 인증 토큰
    console.log(access_token);
    imp_uid = "imp_987642018546";
    // imp_uid로 아임포트 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
      method: "get", // GET method
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
    });
    const paymentData = getPaymentData.data.response; // 조회한 결제 정보
    console.log(paymentData);
    const { amount, status } = paymentData;
    if (amount == req.query.price) {
      // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
      await Order.create({
        user_id: 1,
        imp_uid: imp_uid,
        price: req.query.price,
      }); // DB에 결제 정보 저장

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
