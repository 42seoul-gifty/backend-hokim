const { Gender } = require("../config/constant");
const {
  getAges,
  getPrices,
  getGroups,
  getCategories,
} = require("../lib/lib.Preference");

const { getAdminUsers } = require("../lib/lib.User");
const { findFilteredReceiver } = require("../lib/lib.Receiver");
const { findOneProduct, findProdcutPreference } = require("../lib/lib.Product");

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

const getProductDetailPage = async (req, res) => {
  try {
    const product = await findOneProduct(req.params.product_id);
    const preference = await findProdcutPreference(req.params.product_id);
    const ageCategory = await getAges();
    var age = [];
    var gender = [];

    preference.forEach((elem) => {
      for (var i = 0; i < ageCategory.length; i += 1) {
        if (
          ageCategory[i].id == elem.age_id &&
          !age.includes(ageCategory[i].value)
        )
          age.push(ageCategory[i].value);
      }

      if (
        gender.length < Gender.length + 2 * (Gender.length - 1) &&
        !gender.includes(Gender[elem.gender_id].value)
      )
        gender.push(Gender[elem.gender_id].value);
    });
    res.render("admin/productDetail", {
      layout: "layout/layout",
      product: product[0],
      age: age.sort().join(", "),
      gender: gender.sort().join(", "),
      price: preference[0].price,
    });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
};

const getProductEditPage = async (req, res) => {
  const product = await findOneProduct(req.params.product_id);

  const preference = await findProdcutPreference(req.params.product_id);

  const age = await getAges();
  const price = await getPrices();
  const group = await getGroups();
  const category = await getCategories();
  res.render("admin/productEdit", {
    layout: "layout/layout",
    product: product[0],
    preference,
    age,
    price,
    group,
    gender: Gender,
    category,
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
  res.render("admin/shippingManage", {
    layout: "layout/layout",
    receiver,
  });
};

const getProductRegisterPage = async (req, res) => {
  const age = await getAges();
  const price = await getPrices();
  const group = await getGroups();
  const category = await getCategories();
  res.render("admin/productRegister", {
    layout: "layout/layout",
    age,
    price,
    group,
    gender: Gender,
    category,
  });
};

module.exports = {
  getProductDetailPage,
  getAppPage,
  getUserPage,
  getProductPage,
  getReceiverPage,
  getProductEditPage,
  getProductRegisterPage,
};
