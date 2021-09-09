const { Age, Price, Feature, Category } = require("../models");

const sequelize = require("../models").sequelize;

const getAges = async (req, res) => {
  try {
    var data = await Age.findAll({ order: ["value"] });
    data = data.map((element) => {
      return element.toJSON();
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getCategories = async (req, res) => {
  try {
    const data = await Category.findAll({ order: ["value"] });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getPrices = async (req, res) => {
  try {
    const data = await Price.findAll({
      order: [sequelize.cast(sequelize.col("value"), "SIGNED")],
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getFeatures = async (req, res) => {
  try {
    const data = await Feature.findAll({ order: ["value"] });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  getAges,
  getPrices,
  getFeatures,
  getCategories,
};
