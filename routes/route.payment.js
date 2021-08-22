const { Router } = require("express");
const router = Router();
const payment = require("../controller/controller.payment");

router.post("/validation", payment.checkPaymentValidation);

module.exports = router;
