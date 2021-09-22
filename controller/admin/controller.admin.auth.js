const Sequelize = require("../../models").Sequelize;
const { Admin } = require("../../models");

const getLoginPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/admin/app");
      return;
    }
    res.render("admin/loginPage", {
      layout: "layout/layout",
      csrfToken: req.csrfToken(),
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
};
const getJoinPage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/admin/app");
      return;
    }
    res.render("admin/joinPage", {
      layout: "layout/layout",
      csrfToken: req.csrfToken(),
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
};

const postJoin = async (req, res) => {
  try {
    const admin = await Admin.create({
      id: req.body.id,
      password: req.body.password,
      nickname: req.body.nickname,
    });
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    if (e.parent.errno == 1062) e.message = "이미 존재하는 아이디입니다.";

    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

const getLogout = async (req, res) => {
  req.logout();
  req.session.save(function () {
    res.redirect("/admin/login");
  });
};

module.exports = {
  getLoginPage,
  getJoinPage,
  postJoin,
  getLogout,
};
