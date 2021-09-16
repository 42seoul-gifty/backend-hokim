const { convertImageUrl, productIncludeFilter } = require("../lib/lib.Product");
const { Product, ProductImage } = require("../models");

const getFilterdProducts = async (req, res) => {
  const include = productIncludeFilter(
    req.query.gender,
    req.query.price,
    req.query.age
  );

  try {
    var products = await Product.findAll({
      include,

      attributes: [
        "id",
        "name",
        "description",
        "detail",
        "thumbnail",
        ["retail_price", "price"],
      ],
      where: {},
    });
    products = products.map((product) => {
      product = product.toJSON();
      convertImageUrl(product);
      return product;
    });

    res.status(200).json({ success: true, data: products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    var product = await Product.findOne({
      include: [{ model: ProductImage }],
      where: { id: req.params.product_id },
      attributes: [
        "id",
        "name",
        "description",
        "detail",
        "thumbnail",
        ["retail_price", "price"],
      ],
    });

    if (!product) throw new Error(`Product not Exist`);

    product = product.toJSON();
    convertImageUrl(product);
    res.status(200).json({ success: true, data: product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getFilterdProducts,
  getProductDetail,
};
