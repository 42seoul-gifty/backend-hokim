const axios = require("axios");
var querystring = require("querystring");
const { kakao_config, naver_config } = require("../config/config");
const { findOrCreate } = require("../lib/lib.User");
const {
  generateToken,
  generateTokenFromRefresh,
} = require("../middleware/jwtAuth");
const { logger } = require("../config/winston");
const { User } = require("../models");

const getKakaoToken = async (req, res) => {
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
        client_id: `${kakao_config.rest_key}`,
        redirect_uri: `${kakao_config.redirect}`,
        code: req.header("Authorization-Code"),
        client_secret: `${kakao_config.secret}`,
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
    userData = kakaoUser.data.kakao_account;
    const user = await findOrCreate(
      userData.email,
      userData.profile.nickname,
      "kakao",
      result.data.access_token
    );

    //토큰 생성
    const { access_token, refresh_token } = await generateToken(req, res, user);
    res.status(200).json({
      success: true,
      data: {
        access_token,
        refresh_token,
        user,
      },
    });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
    return;
  }
};

const getNaverToken = async (req, res) => {
  try {
    code = req.header("Authorization-Code");

    const result = await axios({
      method: "get",
      url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naver_config.client_id}&client_secret=${naver_config.secret}&redirect_uri==${naver_config.redirect}&code=${code}`,
      headers: {
        "X-Naver-Client-Id": naver_config.client_id,
        "X-Naver-Client-Secret": naver_config.secret,
      },
    });
    //엑세스 토큰으로 사용자 정보 불러오기
    const naverUser = await axios({
      method: "get",
      url: "https://openapi.naver.com/v1/nid/me",
      headers: {
        Authorization: `${result.data.token_type} ${result.data.access_token}`,
      },
    });
    const user = await findOrCreate(
      naverUser.data.response.email,
      naverUser.data.response.nickname,
      "naver",
      result.data.access_token
    );

    //토큰 생성
    const { access_token, refresh_token } = await generateToken(req, res, user);
    res.status(200).json({
      success: true,
      data: {
        access_token,
        refresh_token,
        user,
      },
    });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
    return;
  }
};

const getRefreshToken = async (req, res) => {
  try {
    const access_token = await generateTokenFromRefresh(req, res);

    res.json({
      success: true,
      data: {
        access_token,
        refresh_token: req.body.refresh_token,
      },
    });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false });
    return;
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.update(
      { token: null },
      { where: { token: req.body.refresh_token } }
    );
    if (user[0] == 0) throw new Error("invalid refresh token");
    res.json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, message: e.message });
    return;
  }
};

module.exports = {
  getKakaoToken,
  getNaverToken,
  getRefreshToken,
  logout,
};
