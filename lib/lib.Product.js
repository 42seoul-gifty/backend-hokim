const { QueryTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const { ProductImage } = require("../models");

function makeToJsonString(value) {
  try {
    value = value.toJSON();
  } catch (e) {
    return;
  }
}

const addImageUrl = async (products) => {
  products = await Promise.all(
    products.map(async (value) => {
      makeToJsonString(value);

      var imageUrls = await ProductImage.findAll({
        where: { product_id: value.id },
      });
      imageUrls = imageUrls.map((url) => {
        return url.toJSON().imageUrl;
      });
      value["image_url"] = imageUrls;
      console.log(value);
      return value;
    })
  );
};

const findFilteredProduct = async (gender, age, price) => {
  try {
    const products = await sequelize.query(
      `SELECT DISTINCT Product.id, name, description, detail, thumbnail, price, brand
      from Product
      join ProductPreference on Product.id = ProductPreference.product_id
      join Preference on Preference.id = ProductPreference.preference_id
        where Preference.age_id = ${age} and Preference.price_id = ${price} and Preference.gender = ${gender}
        ;`,
      { type: QueryTypes.SELECT }
    );
    await addImageUrl(products);
    return products;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findReceiverLikeProduct = async (receiver_id) => {
  try {
    const products = await sequelize.query(
      `SELECT DISTINCT Product.id, name, description, detail, thumbnail, price, brand
        from LikeProduct
        join Product on LikeProduct.product_id = Product.id
        where likes = 1 and receiver_id = ${receiver_id};`,
      { type: QueryTypes.SELECT }
    );

    await addImageUrl(products);
    return products;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { findFilteredProduct, findReceiverLikeProduct, addImageUrl };
