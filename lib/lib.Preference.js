const {
  Preference,
  PreferenceAge,
  PreferencePrice,
  PreferenceGroup,
  ProductPreference,
  Category,
} = require("../models");

const sequelize = require("../models").sequelize;

const findOrCreate = async (gender_id, age_id, group_id, price_id) => {
  try {
    var preferenceData = { gender_id, age_id, price_id };
    if (group_id) preferenceData[group_id] = group_id;

    var preference = await Preference.findOne({
      where: preferenceData,
    });
    if (!preference) preference = await Preference.create(preferenceData);

    return preference.toJSON();
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAges = async (req, res) => {
  try {
    var data = await PreferenceAge.findAll({ order: ["value"] });
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
    const data = await PreferencePrice.findAll({
      order: [sequelize.cast(sequelize.col("value"), "SIGNED")],
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getGroups = async (req, res) => {
  try {
    const data = await PreferenceGroup.findAll({ order: ["value"] });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  findOrCreate,
  getAges,
  getPrices,
  getGroups,
  getCategories,
};
