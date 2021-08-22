const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "+09:00", //한국 시간 셋팅
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

let db = [];

const model = require("./User")(sequelize, Sequelize.DataTypes);
db[model.name] = model;
if ("associate" in db[model.name]) {
  db[model.name].associate(db);
}

console.log(`${process.env.SITE_DOMAIN}/kakao/callback`);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
