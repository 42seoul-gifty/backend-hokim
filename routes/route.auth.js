const { Router } = require("express");
const router = Router();
const auth = require("../controller/controller.auth");

const { kakao_config, naver_config } = require("../config/config");
router.get("/kakao/test", (req, res) => {
  res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_config.rest_key}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}&response_type=code`
  );
});

router.get("/naver/test", (req, res) => {
  res.redirect(
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_config.client_id}&redirect_uri=${process.env.NAVER_CALLBACK_URL}`
  );
});

router.get("/kakao", auth.getKakaoToken);

router.get("/naver", auth.getNaverToken);

router.post("/token/refresh", auth.getRefreshToken);

router.get("/logout", auth.logout);

module.exports = router;
