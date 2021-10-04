const express = require("express");
const router = express.Router();
const auth = require("./route.auth");
const payment = require("./route.payment");
const admin = require("./route.admin");
const product = require("./route.product");
const user = require("./route.user");
const receiver = require("./route.receiver");

const getCategories = require("../controller/admin/controller.admin.category");
const checkLogin = require("../middleware/checkLogin");
const adminAuth = require("./route.admin.auth");

const csrfProtection = require("../middleware/csrfProtection");
const { getRefreshToken, logout } = require("../controller/controller.auth");
const { checkAdminMode } = require("../lib/lib.adminMode");
const swaggerUI = require("swagger-ui-express");
const { specs } = require("../swagger/swagger");
const { decodeToken } = require("../middleware/jwtAuth");

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

router.get("/", (req, res) => {
  res.render("index", {});
});

router.post("/logout", decodeToken, logout);
router.post("/token/refresh", getRefreshToken);

router.get("/genders", checkAdminMode, getCategories.getGenderCategory);
router.get("/ages", checkAdminMode, getCategories.getAgeCategory);
router.get("/prices", checkAdminMode, getCategories.getPriceCategory);
router.get("/features", checkAdminMode, getCategories.getFeatureCategory);
router.get("/categorys", checkAdminMode, getCategories.getCategory);
router.get("/all", checkAdminMode, getCategories.getAllCategory);

router.use("/users", decodeToken, user);
router.use("/login", auth);
router.use("/payment", decodeToken, payment);

router.use("/admin", csrfProtection, adminAuth);
router.use("/admin", checkLogin, csrfProtection, admin);
router.use("/products", decodeToken, product);
router.use("/receiver", receiver);

module.exports = router;
