const { Router } = require("express");
const router = Router();
const auth = require("../controller/controller.auth");

router.get("/kakao", auth.redirectKakao);

router.get("/kakao/callback", auth.getKakaoToken);

router.get("/kakao/logout", auth.kakaoLogout);

router.get("/naver", auth.redirectNaver);

router.get("/naver/callback", auth.getNaverToken);

router.get("/naver/logout", auth.naverLogout);

module.exports = router;
