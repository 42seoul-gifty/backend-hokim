const { Router } = require("express");
const router = Router();
const admin = require("../controller/controller.admin");
const adminPage = require("../controller/controller.adminPage");

router.get("/app", adminPage.getAppPage);

router.get("/product/manage", adminPage.getProductPage);
router.post("/product/filter", admin.getAdminFilterdProduct);

router.patch("/cateories", admin.patchAllCategory);

router.get("/product/register", (req, res) => {
  res.render("../views/admin/productRegister.ejs", {});
});

router.get("/shipping", (req, res) => {
  res.render("../views/admin/shippingManage.ejs", {});
});

router.get("/user", adminPage.getUserPage);
router.post("/user/filter", admin.getAdminFilterdUser);
router.delete("/user/:user_id", admin.removeUser);

module.exports = router;
