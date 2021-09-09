const { Router } = require("express");
const router = Router();
const like = require("../controller/controller.like");
const product = require("../controller/controller.product");

router.get("/", product.getFilterdProduct);
router.get("/:product_id", product.getProductDetail);
router.post("/:product_id/like", (req, res) => like.postLike(req, res, true));
router.post("/:product_id/dislike", (req, res) =>
  like.postLike(req, res, false)
);

module.exports = router;
