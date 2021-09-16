const { Router } = require("express");
const router = Router();
const like = require("../controller/controller.like");
const product = require("../controller/controller.product");

router.get("/", product.getFilterdProducts);
router.get("/:product_id", product.getProductDetail);

module.exports = router;
