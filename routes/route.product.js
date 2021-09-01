const { Router } = require("express");
const router = Router();
const like = require("../controller/controller.like");

router.post("/:product_id/like", (req,res)=>like.postLike(req,res,true));
router.post("/:product_id/dislike", (req,res)=>like.postLike(req,res,false));

module.exports = router;
