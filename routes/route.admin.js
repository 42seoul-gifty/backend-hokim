const { Router } = require("express");
const router = Router();
const category = require("../controller/admin/controller.admin.category");
const order = require("../controller/admin/controller.admin.order");
const product = require("../controller/admin/controller.admin.product");
const productPage = require("../controller/admin/controller.admin.productPage");
const receiver = require("../controller/admin/controller.admin.receiver");
const user = require("../controller/admin/controller.admin.user");

router.get("/app", category.getAppPage);

router.get("/product/manage", productPage.getProductPage);
router.post("/product/filter", product.getAdminFilterdProduct);

router.get("/product/detail/:product_id", productPage.getProductDetailPage);
router.get("/product/edit/:product_id", productPage.getProductEditPage);
router.patch("/product/edit/:product_id", product.patchProduct);

router.patch("/cateories", category.patchAllCategory);

router.get("/product/register", productPage.getProductRegisterPage);
router.post("/product/register", product.postProduct);

router.delete("/product/:product_id", product.deleteProduct);

router.get("/shipping", receiver.getReceiverPage);
router.post("/shipping/filter", receiver.getAdminFilterdReceiver);
router.patch("/shipping", receiver.updateReceiverShipment);

router.get("/user", user.getUserPage);
router.post("/user/filter", user.getAdminFilterdUser);
router.get("/user/detail/:user_id", user.getUserDetailPage);
router.delete("/user/:user_id", user.deleteUser);
router.delete("/user/:user_id/orders/:order_id", order.deleteAdminOrder);

router.get("/order/detail/:order_id", order.getOrderDetailPage);

router.get("/receiver/detail/:receiver_id", receiver.getReceiverDetailPage);
router.patch("/receiver/:receiver_id", receiver.patchReceiverAdmin);


module.exports = router;
