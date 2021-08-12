const express = require("express");

class App {
  constructor() {
    this.app = express();

    this.app.use(express.static("./public"));
    this.app.use(require("./routes"));
    this.app.set("view engine", "ejs");
  }
}

module.exports = new App().app;
