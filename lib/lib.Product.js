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
      if (!elem) return true;
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
const findOneProduct = async (id) => {
  try {
    const product = await sequelize.query(
      `
      SELECT *
      FROM Product
       where Product.id = ${id};
        ;
          `,
      { type: QueryTypes.SELECT }
    );

    await addImageUrl(product);
    return product;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findOneAdminProduct = async (id) => {
  try {
    const product = await sequelize.query(
      `
      SELECT DISTINCT
            Product.id, Category.value AS category, name, description, fee_rate, link,
            detail, thumbnail, brand, orders, exposes,likes,
            Product.price AS retail_price,  category_id
        FROM Product
        LEFT JOIN (
        SELECT DISTINCT product_id, COUNT(likes) AS exposes,
      COUNT(CASE WHEN likes = 1 THEN 1 END) AS likes
      FROM LikeProduct 
      GROUP BY product_id
        ) likes on likes.product_id = Product.id
        LEFT JOIN (
        SELECT DISTINCT product_id, COUNT(product_id) AS orders
      FROM Receiver 
      where product_id is not null
      GROUP BY product_id
        ) orders on orders.product_id = Product.id
        LEFT JOIN ProductPreference ON Product.id = ProductPreference.product_id
        LEFT JOIN Category ON Category.id = Product.category_id
        where Product.id = ${id};
        ;
          `,
      { type: QueryTypes.SELECT }
    );

    await addImageUrl(product);
    return product;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findFilteredProduct = async (gender, age, price) => {
  const condition = makeSqlCondition([gender], [age], [price]);

  try {
    const products = await sequelize.query(
      `
            SELECT DISTINCT Product.id, Category.value as category, name, description, detail, thumbnail, price, brand
                  from Product
                  left join ProductPreference on Product.id = ProductPreference.product_id
                  left join Preference on Preference.id = ProductPreference.preference_id
                  left join Category on Category.id = Product.category_id
                   ${condition}
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

const findProdcutPreference = async (id) => {
  try {
    var preference = await sequelize.query(
      `
      SELECT age_id, price_id, gender_id, PP.\`value\` as price
      FROM ProductPreference
      LEFT JOIN Preference P ON P.id = ProductPreference.preference_id
      JOIN PreferencePrice PP ON P.price_id =PP.id
      WHERE product_id = ${id}
      ;
      `,
      { type: QueryTypes.SELECT }
    );

    return preference;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  findProdcutPreference,
  findOneAdminProduct,
  findOneProduct,
  findFilteredProduct,
  findAdminFilteredProduct,
  findReceiverLikeProduct,
  addImageUrl,
};
