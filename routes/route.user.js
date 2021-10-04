const { Router } = require("express");
const router = Router();
const user = require("../controller/controller.user");
const order = require("../controller/controller.order");
const { checkTokenPermission } = require("../middleware/jwtAuth");

router.get("/:user_id", checkTokenPermission, user.getUser);
router.get("/:user_id/orders", checkTokenPermission, order.getOrders);

router.post("/:user_id/orders/", checkTokenPermission, order.postOrder);
router.get(
  "/:user_id/orders/:order_id",
  checkTokenPermission,
  order.getOrderDetail
);
router.delete(
  "/:user_id/orders/:order_id",
  checkTokenPermission,
  order.deleteOrder
);

module.exports = router;
