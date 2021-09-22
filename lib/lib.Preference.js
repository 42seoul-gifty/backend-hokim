const { Age, Price, Feature, Category, Gender } = require("../models");

const sequelize = require("../models").sequelize;

const getGenders = async (all) => {
  const attributes = ["id", "value"];
  const option = { deleted: 0 };
  if (all == 1) {
    attributes.push("deleted");
    delete option.deleted;
    console.log(attributes);
    console.log(option);
  }
  try {
    var data = await Gender.findAll({
      attributes: attributes,
      where: option,
    });
    data = data.map((element) => {
      return element.toJSON();
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAges = async (all) => {
  const attributes = ["id", "value"];
  const option = { deleted: 0 };
  if (all == 1) {
    attributes.push("deleted");
    delete option.deleted;
    console.log(attributes);
    console.log(option);
  }
  try {
    var data = await Age.findAll({
      attributes: attributes,
      where: option,
      order: ["value"],
    });
    data = data.map((element) => {
      return element.toJSON();
    });

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getCategories = async (all) => {
  const attributes = ["id", "value"];
  const option = { deleted: 0 };
  if (all == 1) {
    attributes.push("deleted");
    delete option.deleted;
    console.log(attributes);
    console.log(option);
  }
  try {
    const data = await Category.findAll({
      attributes: attributes,
      where: option,
      order: ["value"],
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getPrices = async (all) => {
  const attributes = ["id", "value"];
  const option = { deleted: 0 };
  if (all == 1) {
    attributes.push("deleted");
    delete option.deleted;
    console.log(attributes);
    console.log(option);
  }
  try {
    const data = await Price.findAll({
      attributes: attributes,
      where: option,
      order: [sequelize.cast(sequelize.col("value"), "SIGNED")],
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getFeatures = async (all) => {
  const attributes = ["id", "value"];
  const option = { deleted: 0 };
  if (all == 1) {
    attributes.push("deleted");
    delete option.deleted;
    console.log(attributes);
    console.log(option);
  }
  try {
    const data = await Feature.findAll({
      attributes: attributes,
      where: option,
      order: ["value"],
    });
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
