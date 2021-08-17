const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");

router.get("/", (req, res) => {
  res.render("index", {});
});

router.use("/login", auth);
module.exports = router;
