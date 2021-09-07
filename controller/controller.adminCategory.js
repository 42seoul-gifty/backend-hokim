const { Gender } = require("../config/constant");
const {
  getAges,
  getPrices,
  getGroups,
  getCategories,
} = require("../lib/lib.Preference");

const {
  PreferenceAge,
  PreferencePrice,
  PreferenceGroup,
  Category,
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

const updateCategory = async (model, newData, type) => {
  await newData.forEach(async (elem) => {
    const data = { value: elem.value };
    if (type == "price") data["retail_price"] = elem.retail_price;
    console.log(data, elem.origin);
    if (elem.label == "removed")
      await model.destroy({ where: { id: elem.origin } });
    else if (elem.label == "edited")
      await model.update(data, { where: { id: elem.origin } });
    else if (elem.label == "new") {
      await model.create(data);
    }
  });
};

const patchAllCategory = async (req, res) => {
  try {
    await updateCategory(PreferenceAge, req.body.age);
    await updateCategory(PreferencePrice, req.body.price, "price");
    await updateCategory(PreferenceGroup, req.body.group);
    await updateCategory(Category, req.body.category);

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
};
