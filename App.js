const express = require("express");
const db = require("./models");
const layout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const cors = require("cors");
class App {
  constructor() {
    this.app = express();
    this.setVieEngine();
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.static("./public"));
    const corsOptions = {
      origin: ["http://localhost:3000", "https://localhost:3000"],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    };
    this.app.use(cors(corsOptions));
    this.app.use(require("./routes"));
    this.dbConnection();
  }

  setVieEngine() {
    this.app.set("./views");
    this.app.set("view engine", "ejs");
    this.app.use(layout);
    this.app.set("layout", "layout/layout");
    this.app.set("layout extractScripts", true);
    this.app.set("layout extractStyles", true);
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
