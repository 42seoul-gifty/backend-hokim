const express = require("express");
const router = express.Router();
const auth = require("./route.auth");
const payment = require("./route.payment");
const admin = require("./route.admin");
const product = require("./route.product");
const user = require("./route.user");
const receiver = require("./route.receiver");

const getCategories = require("../controller/controller.adminCategory");

router.get("/", (req, res) => {
  res.render("index", {});
});

router.get("/genders", getCategories.getGenderCategory);
router.get("/ages", getCategories.getAgeCategory);
router.get("/prices", getCategories.getPriceCategory);
router.get("/groups", getCategories.getPriceCategory);
router.get("/all", getCategories.getAllCategory);

router.use("/users", user);
router.use("/login", auth);
router.use("/payment", payment);
router.use("/admin", admin);
router.use("/products", product);
router.use("/receiver", receiver);

module.exports = router;
