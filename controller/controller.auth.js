const axios = require("axios");
var querystring = require("querystring");
const { kakao_config, domain, naver_config } = require("../config/config");

const { findOrCreate } = require("../lib/lib.User");

const { generateToken } = require("../middleware/jwt-auth");

const getKakaoToken = async (req, res) => {
  try {
    //코드로 토큰 받아오기
    console.log(req.query.code);
    const result = await axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        grant_type: "authorization_code",
        client_id: `${kakao_config.rest_key}`,
        redirect_uri: `${domain}/login/kakao`,
        code: req.query.code,
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
    await generateToken(req, res, user);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
    return;
  }
};

const getNaverToken = async (req, res) => {
  try {
    code = req.query.code;
    state = req.query.state;
    api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naver_config.client_id}&client_secret=${naver_config.secret}&redirect_uri==${process.env.SITE_DOMAIN}/login/naver&code=${code}&state=${state}`;

    const result = await axios({
      method: "get",
      url: api_url,
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
    await generateToken(req, res, user);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
    return;
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
    return;
  }
};

module.exports = {
  getKakaoToken,
  logout,
  getNaverToken,
};
