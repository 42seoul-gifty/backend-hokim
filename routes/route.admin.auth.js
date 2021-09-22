const { Router } = require("express");
const auth = require("../controller/admin/controller.admin.auth");
const router = Router();

const passport = require("../middleware/passport-local");

router.get("/login", auth.getLoginPage);
router.get("/join", auth.getJoinPage);
router.post("/join", auth.postJoin);
router.get("/logout", auth.getLogout);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/admin/login",
  }),
  (req, res) => {
    console.log("success");
    res.redirect("/admin/app");
  }
);

module.exports = router;
