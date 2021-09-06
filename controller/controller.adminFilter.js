const {
  User,
  Receiver,
  Product,
  ProductPreference,
  ProductImage,
} = require("../models");
const {
  findAdminFilteredProduct,
  findProdcutPreference,
} = require("../lib/lib.Product");

const { getAdminUsers } = require("../lib/lib.User");
const { findFilteredReceiver } = require("../lib/lib.Receiver");
const { findOrCreate } = require("../lib/lib.Preference");

const getAdminFilterdProduct = async (req, res) => {
  try {
    const products = await findAdminFilteredProduct(
      req.body.gender,
      req.body.age,
      req.body.price,
      req.body.category
    );
    res.status(200).json({ success: true, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdUser = async (req, res) => {
  try {
    const user = await getAdminUsers(req.query.order);
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdReceiver = async (req, res) => {
  try {
    const receiver = await findFilteredReceiver(req.body.start, req.body.end);
    res.status(200).json({ success: true, receiver });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.user_id } });
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const updateShipping = async (req, res) => {
  try {
    const receiver = [];
    await req.body.changed.forEach(async (element) => {
      receiver.push(
        await Receiver.update(
          { shipmentStatus: element.value },
          { where: { id: element.id } }
        )
      );
    });

    res.status(200).json({ success: true, receiver });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const cartesian = (a, b, c) => {
  const result = [];
  a.forEach((a_elem) => {
    b.forEach((b_elem) => {
      result.push({ gender_id: a_elem, age_id: b_elem, price_id: c });
    });
  });
  return result;
};

const patchProductEditPage = async (req, res) => {
  //id: image:  gender: age: price
  //:category: name: link:thumbnail:brand:retail_price: fee_rate:  description: detail

  try {
    const preferences = cartesian(
      req.body.gender,
      req.body.age,
      req.body.price
    );

    const preferencesBulk = [];

    await Promise.all(
      preferences.map(async (elem) => {
        const pref = await findOrCreate(
          elem.gender_id,
          elem.age_id,
          null,
          elem.price_id
        );
        preferencesBulk.push({
          preference_id: pref.id,
          product_id: req.body.id,
        });
      })
    );
    await ProductPreference.destroy({ where: { product_id: req.body.id } });
    await ProductPreference.bulkCreate(preferencesBulk);

    await Product.update(
      {
        category_id: req.body.category,
        price: req.body.retail_price,
        name: req.body.name,
        link: req.body.link,
        thumbnail: req.body.thumbnail,
        brand: req.body.brand,
        fee_rate: req.body.fee_rate,
        description: req.body.description,
        detail: req.body.detail,
      },
      { where: { id: req.body.id } }
    );

    const image_url = [];
    req.body.image.forEach((elelm) => {
      image_url.push({ product_id: req.body.id, imageUrl: elelm });
    });
    await ProductImage.destroy({ where: { product_id: req.body.id } });
    await ProductImage.bulkCreate(image_url);

    // console.log(req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const pushProductRegister = async (req, res) => {
  //id: image:  gender: age: price
  //:category: name: link:thumbnail:brand:retail_price: fee_rate:  description: detail

  try {
    const product = await Product.create({
      id: req.body.id,
      category_id: req.body.category,
      price: req.body.retail_price,
      name: req.body.name,
      link: req.body.link,
      thumbnail: req.body.thumbnail,
      brand: req.body.brand,
      fee_rate: req.body.fee_rate,
      description: req.body.description,
      detail: req.body.detail,
    });

    const image_url = [];
    req.body.image.forEach((elem) => {
      image_url.push({ product_id: product.id, imageUrl: elem });
    });
    await ProductImage.bulkCreate(image_url);

    const preferences = cartesian(
      req.body.gender,
      req.body.age,
      req.body.price
    );
    const preferencesBulk = [];

    await Promise.all(
      preferences.map(async (elem) => {
        const pref = await findOrCreate(
          elem.gender_id,
          elem.age_id,
          null,
          elem.price_id
        );
        preferencesBulk.push({
          preference_id: pref.id,
          product_id: product.id,
        });
      })
    );
    await ProductPreference.bulkCreate(preferencesBulk);

    // console.log(req.body);
    res.status(200).json({ success: true, product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const deleteProduct = async (req, res) => {
  //id: image:  gender: age: price
  //:category: name: link:thumbnail:brand:retail_price: fee_rate:  description: detail

  try {
    await Product.destroy({ where: { id: req.body.product_id } });
    // console.log(req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAdminFilterdProduct,
  getAdminFilterdUser,
  getAdminFilterdReceiver,
  updateShipping,
  removeUser,
  patchProductEditPage,
  pushProductRegister,
  deleteProduct,
};
