const { Gender } = require("../config/constant");
const {
  getAges,
  getPrices,
  getGroups,
  getCategories,
} = require("../lib/lib.Preference");

const { getAdminUsers } = require("../lib/lib.User");
const { findFilteredReceiver } = require("../lib/lib.Receiver");

const getAppPage = async (req, res) => {
  res.render("admin/appManage", {
    layout: "layout/layout",
    data: {
      gender: Gender,
    },
  });
};

const getProductPage = async (req, res) => {
  const age = await getAges();
  const price = await getPrices();
  const group = await getGroups();
  const category = await getCategories();

  res.render("admin/productManage", {
    layout: "layout/layout",
    age,
    price,
    group,
    category,
    gender: Gender,
  });
};

const getUserPage = async (req, res) => {
  const user = await getAdminUsers();

  res.render("admin/userManage", {
    layout: "layout/layout",
    user,
  });
};

const getReceiverPage = async (req, res) => {
  const receiver = await findFilteredReceiver();
  res.render("admin/shippingManage", { layout: "layout/layout", receiver });
};

module.exports = {
  getAppPage,
  getUserPage,
  getProductPage,
  getReceiverPage,
};
