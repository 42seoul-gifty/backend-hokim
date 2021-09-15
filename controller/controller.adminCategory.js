const { Gender } = require("../config/constant");
const {
  getAges,
  getPrices,
  getFeatures,
  getCategories,
  getGenders,
} = require("../lib/lib.Preference");

const { Age, Price, Feature, Category } = require("../models");

const getAgeCategory = async (req, res) => {
  try {
    const data = await getAges();
    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getGenderCategory = async (req, res) => {
  try {
    const data = await getGenders();
    res.status(200).json({ success: true, data });
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

const getFeatureCategory = async (req, res) => {
  try {
    const data = await getCategories();
    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const age = await getAges();
    const price = await getPrices();
    const feature = await getFeatures();
    const category = await getCategories();
    const gender = await getGenders();

    res.json({
      data: {
        age,
        price,
        feature,
        category,
        gender,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const updateCategory = async (model, newData) => {
  await newData.forEach(async (elem) => {
    const data = { value: elem.value };

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
    await updateCategory(Age, req.body.age);
    await updateCategory(Price, req.body.price);

    await updateCategory(Feature, req.body.feature);
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
  getAllCategory,
  patchAllCategory,
};
