const { Price, Age, ProductGender, ProductImage } = require("../models");

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
      model: ProductGender,
      attributes: [],
      where: { gender },
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

module.exports = {
  convertImageUrl,
  productIncludeFilter,
};
