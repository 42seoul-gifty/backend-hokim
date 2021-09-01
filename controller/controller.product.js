const { findFilteredProduct } = require("../lib/lib.Product");
const { Product } = require("../models");

const getFilterdProduct = async (req, res) => {
  try {
    const products = await findFilteredProduct(
      req.body.gender,
      req.body.age,
      req.body.price
    );
    res.status(200).json({ success: true, data: products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.product_id },
    });
    res.status(200).json({ success: true, data: product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const postProduct = async (req, res) => {
  res.status(200).json({});
};

const patchProduct = async (req, res) => {
  res.status(200).json({});
};

module.exports = {
  getFilterdProduct,
  getProductDetail,
  postProduct,
  patchProduct,
};
