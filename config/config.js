require("dotenv").config();

const db_config = {
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: "+09:00",
};
const domain = process.env.SITE_DOMAIN;

const kakao_config = {
  rest_key: process.env.KAKAO_REST_KEY,
  secret: process.env.KAKAO_SECRET,
};

const naver_config = {
  client_id: process.env.NAVER_CLIENT_ID,
  secret: process.env.NAVER_SECRET,
};

module.exports = { db_config, domain, kakao_config, naver_config };
