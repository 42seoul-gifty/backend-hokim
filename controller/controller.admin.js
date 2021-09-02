const { Gender } = require("../config/constant");
const {
  getAges,
  getPrices,
  getGroups,
  getCategories,
} = require("../lib/lib.Preference");
const { User } = require("../models");
const { findAdminFilteredProduct } = require("../lib/lib.Product");

const {
  PreferenceAge,
  PreferencePrice,
  PreferenceGroup,
  Category,
} = require("../models");
const { getAdminUsers } = require("../lib/lib.User");

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
    const data = await getCategories();
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
  const category = await getCategories();

  res.json({
    data: {
      age,
      price,
      group,
      category,
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
    const category = await getCategories();

    await updateCategory(PreferenceAge, age, req.body.age);
    await updateCategory(PreferencePrice, price, req.body.price);
    await updateCategory(PreferenceGroup, group, req.body.group);
    await updateCategory(Category, category, req.body.category);

    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdProduct = async (req, res) => {
  try {
    console.log(req.body);
    const products = await findAdminFilteredProduct(
      req.body.gender,
      req.body.age,
      req.body.price,
      req.body.category
    );
    res.status(200).json({ success: true, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await getAdminUsers(req.query.order);
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const removeUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.destroy({ where: { id: req.params.user_id } });
    res.status(200).json({ success: true });
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
  getAllCategory,
  patchAllCategory,
  getAdminFilterdProduct,
  getAdminFilterdUser,
  removeUser,
};
