const { Router } = require("express");
const router = Router();
const admin = require("../controller/controller.admin");

router.get("/app", admin.getAppPage);

router.get("/product/manage", admin.getProductPage);
router.post("/product/filter", admin.getProducts);

router.patch("/cateories", admin.patchAllCategory);

router.get("/product/register", (req, res) => {
  res.render("../views/admin/productRegister.ejs", {});
});

router.get("/shipping", (req, res) => {
  res.render("../views/admin/shippingManage.ejs", {});
});

router.get("/user", (req, res) => {
  res.render("../views/admin/userManage.ejs", {});
});

module.exports = router;
