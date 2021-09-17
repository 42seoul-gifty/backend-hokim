const { Router } = require("express");
const router = Router();
const receiver = require("../controller/controller.receiver");

router.get("/:receiver_id/choice", receiver.getReceiversChoice);
router.get("/:receiver_id", receiver.getReceiver);
router.patch("/:receiver_id", receiver.patchReceiver);
router.post("/:receiver_id/send", receiver.sendSMS);

module.exports = router;
