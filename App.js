const express = require("express");
const db = require("./models");
const layout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { stream, logger } = require("./config/winston");

require("dotenv").config();

const session = require("express-session"); // 세션 설정
const passport = require("passport");

class App {
  constructor() {
    const morganFormat = process.env.NODE_ENV == "dev" ? "dev" : "combined";

    this.app = express();
    this.setVieEngine();
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static("./public"));
    const corsOptions = {
      origin: ["http://localhost:3000", "https://localhost:3000"],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    };
    this.app.use(cors(corsOptions));
    this.dbConnection();
    this.setPassport();
    this.app.use(morgan(morganFormat, { stream }));
    this.app.use(require("./routes"));
  }

  setPassport() {
    const SequelizeStore = require("connect-session-sequelize")(session.Store);

    this.app.sessionMiddleWare = session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 2000 * 60 * 60,
      },
      store: new SequelizeStore({
        db: db.sequelize,
      }),
    });

    this.app.use(this.app.sessionMiddleWare);

    this.app.use(passport.initialize()); // passport 구동
    this.app.use(passport.session()); // 세션 연결

    this.app.use(flash());
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
        logger.info("Connection has been established successfully.");
        return db.sequelize.sync();
      })
      .then(() => {
        logger.info("DB Sync complete.");
      })
      .catch((err) => {
        logger.error("Unable to connect to the database:", err);
      });
  }
}

module.exports = new App().app;
