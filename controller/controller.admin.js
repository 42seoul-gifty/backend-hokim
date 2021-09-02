const { Gender } = require("../config/constant");
const { getAges, getPrices, getGroups } = require("../lib/lib.Preference");
const { User } = require("../models");
const { findAdminFilteredProduct } = require("../lib/lib.Product");

const {
  PreferenceAge,
  PreferencePrice,
  PreferenceGroup,
} = require("../models");

const getAgeCategory = async (req, res) => {
  try {
    const data = await getAges();
    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getGenderCategory = (req, res) => {
  try {
    res.status(200).json({ success: true, data: Gender });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getPriceCategory = async (req, res) => {
  try {
    const data = await getPrices();
    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getGroupCategory = async (req, res) => {
  try {
    const data = await getGroups();
    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAllCategory = async (req, res) => {
  const age = await getAges();
  const price = await getPrices();
  const group = await getGroups();

  res.json({
    data: {
      age,
      price,
      group,
      gender: Gender,
    },
  });
};

const updateCategory = async (model, originalData, newData) => {
  await newData.forEach(async (elem) => {
    if (elem.label == "removed")
      await model.destroy({ where: { value: elem.value } });
    else if (elem.label == "edited")
      await model.update(
        { value: elem.value },
        { where: { value: elem.origin } }
      );
    else if (elem.label == "new") {
      await model.create({ value: elem.value });
    }
  });
};

const patchAllCategory = async (req, res) => {
  try {
    const age = await getAges();
    const price = await getPrices();
    const group = await getGroups();

    await updateCategory(PreferenceAge, age, req.body.age);
    await updateCategory(PreferencePrice, price, req.body.price);
    await updateCategory(PreferenceGroup, group, req.body.group);

    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

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

  res.render("admin/productManage", {
    layout: "layout/layout",
    age,
    price,
    group,
    gender: Gender,
  });
};

const getUserPage = async (req, res) => {
  const user = await User.findAll({});

  res.render("admin/userManage", {
    layout: "layout/layout",
    user,
  });
};

const getAdminFilterdProduct = async (req, res) => {
  try {
    const products = await findAdminFilteredProduct(
      req.body.gender,
      req.body.age,
      req.body.price
    );
    res.status(200).json({ success: true, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getGenderCategory,
  getAgeCategory,
  getPriceCategory,
  getPriceCategory,
  getAppPage,
  getUserPage,
  getAllCategory,
  patchAllCategory,
  getProductPage,
  getAdminFilterdProduct,
};
