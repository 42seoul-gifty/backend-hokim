const { Age, Price, Feature, Category, Gender } = require("../models");

const sequelize = require("../models").sequelize;

const getGenders = async () => {
  try {
    var data = await Gender.findAll({});
    data = data.map((element) => {
      return element.toJSON();
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAges = async () => {
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

const getCategories = async () => {
  try {
    const data = await Category.findAll({ order: ["value"] });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getPrices = async () => {
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

const getFeatures = async () => {
  try {
    const data = await Feature.findAll({ order: ["value"] });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  getGenders,
  getAges,
  getPrices,
  getFeatures,
  getCategories,
};
