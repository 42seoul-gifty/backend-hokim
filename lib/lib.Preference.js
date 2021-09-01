const {
  Preference,
  PreferenceAge,
  PreferencePrice,
  PreferenceGroup,
} = require("../models");

const sequelize = require("../models").sequelize;

const findOrCreate = async (gender, age_id, group_id, price_id) => {
  try {
    var preferenceData = { gender, age_id, price_id };
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
    const data = await PreferenceAge.findAll({ order: ["value"] });
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

module.exports = { findOrCreate, getAges, getPrices, getGroups };