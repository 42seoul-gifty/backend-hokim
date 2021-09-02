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
      return value;
    })
  );
};

const makeSqlCondition = (gender, age, price, category) => {
  const target = [gender, age, price, category];
  const columnName = ["gender", "age", "price", "category"];
  const modelName = ["Preference", "Preference", "Preference", "Product"];
  const condition = ["", "", "", ""];
  var result = "";
  for (let i = 0; i < target.length; i++) {
    target[i]?.forEach((elem) => {
      if (condition[i] == "") condition[i] += " ( ";
      if (condition[i].includes(modelName[i])) condition[i] += " or ";
      condition[i] += `${modelName[i]}.${columnName[i]}_id = ${elem}`;
    });
    if (condition[i] != "") {
      condition[i] += ")";
      if (result != "") result += " and ";
      result += condition[i];
    }
  }
  if (result != "") result = "where " + result;
  return result;
};

const findFilteredProduct = async (gender, age, price) => {
  try {
    const products = await sequelize.query(
      `
            SELECT DISTINCT Product.id, Category.value as category, name, description, detail, thumbnail, price, brand
                  from Product
                  left join ProductPreference on Product.id = ProductPreference.product_id
                  left join Preference on Preference.id = ProductPreference.preference_id
                  left join Category on Category.id = Product.category_id
                  where Preference.age_id = ${age} and Preference.price_id = ${price} and Preference.gender_id = ${gender}
                  ;
          `,
      { type: QueryTypes.SELECT }
    );

    await addImageUrl(products);
    return products;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findAdminFilteredProduct = async (gender, age, price, category) => {
  try {
    const condition = makeSqlCondition(gender, age, price, category);
    const products = await sequelize.query(
      `
          WITH FilterdProduct AS(
            SELECT DISTINCT Product.id, name, Category.value as category, description, detail, thumbnail, price, brand
                  from Product
                  left join ProductPreference on Product.id = ProductPreference.product_id
                  left join Preference on Preference.id = ProductPreference.preference_id
                  left join Category on Category.id = Product.category_id
                   ${condition}
            )
            SELECT DISTINCT
                FilterdProduct.id, FilterdProduct.name, description, detail,
                thumbnail, price, brand, category,
                COUNT(LikeProduct.likes) AS exposes,
                COUNT(CASE WHEN LikeProduct.likes = 1 THEN 1 END) AS likes,
                COUNT(DISTINCT Receiver.product_id, Receiver.id) AS orders
            FROM FilterdProduct
              LEFT JOIN LikeProduct ON FilterdProduct.id = LikeProduct.product_id
              LEFT JOIN Receiver ON LikeProduct.receiver_id = Receiver.id
              where FilterdProduct.id is not null
              group by FilterdProduct.id
            ;
          `,
      { type: QueryTypes.SELECT }
    );

    await addImageUrl(products);
    return products;
    return null;
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

module.exports = {
  findFilteredProduct,
  findAdminFilteredProduct,
  findReceiverLikeProduct,
  addImageUrl,
};
