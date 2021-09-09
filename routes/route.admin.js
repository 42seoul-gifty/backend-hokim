const { Router } = require("express");
const router = Router();
const category = require("../controller/controller.adminCategory");
const filter = require("../controller/controller.adminFilter");
const adminPage = require("../controller/controller.adminPage");
const product = require("../controller/controller.product");
const receiver = require("../controller/controller.receiver");
const user = require("../controller/controller.user");

router.get("/app", adminPage.getAppPage);

router.get("/product/manage", adminPage.getProductPage);
router.post("/product/filter", filter.getAdminFilterdProduct);

router.get("/product/detail/:product_id", adminPage.getProductDetailPage);
router.get("/product/edit/:product_id", adminPage.getProductEditPage);
router.patch("/product/edit/:product_id", product.patchProduct);

router.patch("/cateories", category.patchAllCategory);

router.get("/product/register", adminPage.getProductRegisterPage);
router.post("/product/register", product.postProduct);

router.delete("/product/:product_id", product.deleteProduct);

router.get("/shipping", adminPage.getReceiverPage);
router.post("/shipping/filter", filter.getAdminFilterdReceiver);
router.patch("/shipping", receiver.updateReceiverShipment);

router.get("/user", adminPage.getUserPage);
router.post("/user/filter", filter.getAdminFilterdUser);
router.delete("/user/:user_id", user.deleteUser);

module.exports = router;
