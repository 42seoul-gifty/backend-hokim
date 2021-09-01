const { Router } = require("express");
const router = Router();
const receiver = require("../controller/controller.receiver");

router.get("/:receiver_id", receiver.getReceiver);
router.patch("/:receiver_id", receiver.patchReceiver);

module.exports = router;
