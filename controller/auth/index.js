const { Router } = require("express");
const router = Router();
const axios = require("axios");
var querystring = require("querystring");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../../models");

router.get("/kakao", (req, res) => {
  res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_KEY}&redirect_uri=${process.env.SITE_DOMAIN}/login/kakao/callback&response_type=code`
  );
});

router.get("/kakao/callback", async (req, res) => {
  try {
    //코드로 토큰 받아오기
    const result = await axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        grant_type: "authorization_code",
        client_id: `${process.env.KAKAO_REST_KEY}`,
        redirect_uri: `${process.env.SITE_DOMAIN}/login/kakao/callback`,
        code: req.query.code,
        client_secret: `${process.env.KAKAO_SECRET}`,
      }),
    });

    //엑세스 토큰으로 사용자 정보 불러오기
    const kakaoUser = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${result.data.access_token}`,
      },
    });

    const userData = kakaoUser.data.kakao_account;
    user = await User.findOne({ where: { id: userData.email } });
    if (!user)
      await User.create({
        id: userData.email,
        nickname: userData.profile.nickname,
        token: result.data.access_token,
      });
  } catch (e) {
    console.log(e);
    res.render("result", { success: "로그인 실패" });
    return;
  }
  res.render("result", { success: "로그인 성공" });
});

router.get("/kakao/logout", async (req, res) => {
  try {
    //카카오 로그아웃
    await axios({
      method: "post",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        Authorization: `Bearer ${req.body.access_token}`,
      },
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
    return;
  }
  res.json({ success: true });
});

module.exports = router;
