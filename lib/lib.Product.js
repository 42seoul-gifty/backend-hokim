const { Price, Age, ProductImage, Gender } = require("../models");
const { Op } = require("sequelize");

function makeToJson(value) {
  try {
    return value.toJSON();
  } catch (e) {
    return value;
  }
}

const convertImageUrl = async (product) => {
  product = makeToJson(product);
  product["image_url"] = product.ProductImages.map((image) => {
    return image.image_url;
  });
  delete product["ProductImages"];
  return product;
};

const productIncludeFilter = (gender, price, age) => {
  const include = [{ model: ProductImage, attributes: ["image_url", "id"] }];
  if (gender)
    include.push({
      model: Gender,
      attributes: [],
      where: { id: gender },
    });
  if (price)
    include.push({
      model: Price,
      attributes: [],
      where: { id: price },
    });
  if (age)
    include.push({
      model: Age,
      attributes: [],
      where: { id: age },
    });
  return include;
};

const productIncludeMutipleFilter = (genders, prices, ages) => {
  const include = [];

  var condition;

  if (genders && genders.length != 0) {
    condition = genders.map((elem) => {
      return { id: elem };
    });

    console.log("genders");
    console.log(condition);
    include.push({
      model: Gender,
      attributes: [],
      where: { [Op.or]: condition },
    });
  }
  if (prices && prices.length != 0) {
    condition = prices.map((elem) => {
      return { id: elem };
    });
    console.log("prices");
    console.log(condition);
    include.push({
      model: Price,
      attributes: [],
      where: { [Op.or]: condition },
    });
  }
  if (ages && ages.length != 0) {
    condition = ages.map((elem) => {
      return { id: elem };
    });
    console.log("ages");
    console.log(condition);
    include.push({
      model: Age,
      attributes: [],
      where: { [Op.or]: condition },
    });
  }
  return include;
};

module.exports = {
  convertImageUrl,
  productIncludeFilter,
  productIncludeMutipleFilter,
};
