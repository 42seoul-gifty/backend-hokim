const Sequelize = require("sequelize");
const config = require("../config/config")["db_config"];
const path = require("path");
const fs = require("fs");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  timezone: config.timezone, //한국 시간 셋팅
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

let db = [];

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
  .forEach((file) => {
    let model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db["ProductAge"] = sequelize.define(
  "ProductAge",
  {},
  {
    tableName: "ProductAge",
  }
);
db["ProductFeature"] = sequelize.define(
  "ProductFeature",
  {},
  {
    tableName: "ProductFeature",
  }
);
db["ProductGender"] = sequelize.define(
  "ProductGender",
  {},
  {
    tableName: "ProductGender",
  }
);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
