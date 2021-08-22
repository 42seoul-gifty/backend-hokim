const express = require("express");
const router = express.Router();
const auth = require("./route.auth");
const payment = require("./route.payment");

router.get("/", (req, res) => {
  res.render("index", {});
});

router.use("/login", auth);
router.use("/payment", payment);

module.exports = router;
