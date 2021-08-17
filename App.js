const express = require("express");
const db = require("./models");

class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.static("./public"));
    this.app.use(require("./routes"));
    this.app.set("view engine", "ejs");

    this.dbConnection();
  }

  dbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        return db.sequelize.sync();
      })
      .then(() => {
        console.log("DB Sync complete.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }
}

module.exports = new App().app;
