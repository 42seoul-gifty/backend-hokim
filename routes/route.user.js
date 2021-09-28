const { Router } = require("express");
const router = Router();
const user = require("../controller/controller.user");
const order = require("../controller/controller.order");

router.get("/:user_id", user.getUser);
router.get("/:user_id/orders", order.getOrders);

router.post("/:user_id/orders/", order.postOrder);
router.get("/:user_id/orders/:order_id", order.getOrderDetail);
router.delete("/:user_id/orders/:order_id", order.deleteOrder);

module.exports = router;
