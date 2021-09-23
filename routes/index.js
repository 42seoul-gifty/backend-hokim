const express = require("express");
const router = express.Router();
const auth = require("./route.auth");
const payment = require("./route.payment");
const admin = require("./route.admin");
const product = require("./route.product");
const user = require("./route.user");
const receiver = require("./route.receiver");
const csrfProtection = require("../middleware/csrfProtection");

const getCategories = require("../controller/admin/controller.admin.category");
const checkLogin = require("../middleware/checkLogin");
const adminAuth = require("./route.admin.auth");
const { checkAdminMode } = require("../lib/lib.adminMode");

router.get("/", (req, res) => {
  res.render("index", {});
});

router.get("/genders", checkAdminMode, getCategories.getGenderCategory);
router.get("/ages", checkAdminMode, getCategories.getAgeCategory);
router.get("/prices", checkAdminMode, getCategories.getPriceCategory);
router.get("/features", checkAdminMode, getCategories.getFeatureCategory);
router.get("/categorys", checkAdminMode, getCategories.getCategory);
router.get("/all", checkAdminMode, getCategories.getAllCategory);

router.use("/users", user);
router.use("/login", auth);
router.use("/payment", payment);

router.use("/admin", csrfProtection, adminAuth);
router.use("/admin", checkLogin, csrfProtection, admin);
router.use("/products", product);
router.use("/receiver", receiver);

module.exports = router;
