const {
  getAges,
  getPrices,
  getFeatures,
  getCategories,
  getGenders,
} = require("../../lib/lib.Preference");
const { Age, Price, Feature, Category, Gender } = require("../../models");

const { logger } = require("../../config/winston");

const getAgeCategory = async (req, res) => {
  try {
    const data = await getAges(1);
    res.status(200).json({ success: true, data });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getGenderCategory = async (req, res) => {
  try {
    const data = await getGenders(1);
    res.status(200).json({ success: true, data });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getPriceCategory = async (req, res) => {
  try {
    const data = await getPrices(1);
    res.status(200).json({ success: true, data });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getFeatureCategory = async (req, res) => {
  try {
    const data = await getFeatures(1);
    res.status(200).json({ success: true, data });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const data = await getCategories(1);

    res.status(200).json({ success: true, data });
  } catch (e) {
    logger.error(e);
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
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const updateCategory = async (model, newData) => {
  await newData.forEach(async (elem) => {
    const data = { value: elem.value };

    if (elem.label == "removed")
      await model.update({ deleted: 1 }, { where: { id: elem.origin } });
    else if (elem.label == "restored")
      await model.update({ deleted: 0 }, { where: { id: elem.origin } });
    else if (elem.label == "edited")
      await model.update(data, { where: { id: elem.origin } });
    else if (elem.label == "new") {
      await model.create(data);
    }
  });
};

const patchAllCategory = async (req, res) => {
  try {
    if (req.body.type == "price") {
      await updateCategory(Price, req.body.data);
    } else if (req.body.type == "age") {
      await updateCategory(Age, req.body.age);
    } else if (req.body.type == "feature") {
      await updateCategory(Feature, req.body.data);
    } else if (req.body.type == "category") {
      await updateCategory(Category, req.body.data);
    } else if (req.body.type == "gender") {
      await updateCategory(Gender, req.body.data);
    }

    res.status(200).json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAppPage = async (req, res) => {
  try {
    var type;
    var name;
    if (req.query.type == "price") {
      type = "price";
      name = "가격을";
    } else if (req.query.type == "age") {
      type = "age";
      name = "나이를";
    } else if (req.query.type == "feature") {
      type = "feature";
      name = "특성그룹을";
    } else if (req.query.type == "category") {
      type = "category";
      name = "카테고리를";
    } else if (!req.query.type || req.query.type == "gender") {
      type = "gender";
      name = "성별을";
    } else throw new Error("Wrong Query");

    const types = [
      ["gender", "성별"],
      ["price", "가격"],
      ["age", "나이"],
      ["feature", "특성그룹"],
      ["category", "카테고리"],
    ];
    res.render("admin/appManage", {
      layout: "layout/layout",
      type,
      name,
      types,
      user: req.user,

      csrfToken: req.csrfToken(),
    });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getGenderCategory,
  getAgeCategory,
  getPriceCategory,
  getAllCategory,
  getCategory,
  patchAllCategory,
  getFeatureCategory,
  getAppPage,
};
