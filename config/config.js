require("dotenv").config();

const db_config = {
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: "+09:00",
};

const development = {
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: "+09:00",
};

const production = {
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: "+09:00",
};

const test = {
  database: process.env.DATABASE,
  username: process.env.DB_USER,
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

const imp_config = {
  key: process.env.IMP_KEY,
  secret: process.env.IMP_SECRET,
};

module.exports = {
  domain,
  db_config,
  kakao_config,
  naver_config,
  imp_config,
  development,
  test,
  production,
};
