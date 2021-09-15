const { convertImageUrl, productIncludeFilter } = require("../lib/lib.Product");
const {
  Product,
  Brand,
  Receiver,
  ProductAge,
  Price,
  Age,
  ProductGender,
  ProductImage,
} = require("../models");

const getFilterdProduct = async (req, res) => {
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

    //TODO:다시작성
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
    product = product.toJSON();
    convertImageUrl(product);
    res.status(200).json({ success: true, data: product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const patchProduct = async (req, res) => {
  //id: image:  gender: age: price
  //:category: name: link:thumbnail:brand:retail_price: fee_rate:  description: detail
  // console.log(req.body);
  try {
    await req.body.images.forEach(async (elem) => {
      if (elem.label == "removed")
        await ProductImage.destroy({ where: { id: elem.origin } });
      else if (elem.label == "edited")
        await ProductImage.update(
          { image_url: elem.image_url },
          { where: { id: elem.origin } }
        );
      else if (elem.label == "new") {
        await ProductImage.create({
          image_url: elem.image_url,
          product_id: req.body.id,
        });
      }
    });

    await ProductAge.destroy({ where: { product_id: req.body.id } });
    await ProductAge.bulkCreate(
      req.body.age.map((age) => {
        return { product_id: req.body.id, age_id: age };
      })
    );

    await ProductGender.destroy({ where: { product_id: req.body.id } });
    await ProductGender.bulkCreate(
      req.body.gender.map((gender) => {
        return { product_id: req.body.id, gender };
      })
    );

    var brand = await Brand.findOrCreate({ where: { value: req.body.brand } });
    brand = brand[0].toJSON();
    const product = await Product.update(
      {
        category_id: req.body.category,
        retail_price: req.body.retail_price,
        price_id: req.body.price,
        name: req.body.name,
        link: req.body.link,
        thumbnail: req.body.thumbnail,
        brand_id: brand.id,
        fee_rate: req.body.fee_rate,
        description: req.body.description,
        detail: req.body.detail,
      },
      { where: { id: req.body.id } }
    );

    //TODO: 다시 작성
    res.status(200).json({ success: true, product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const postProduct = async (req, res) => {
  //id: image:  gender: age: price
  //:category: name: link:thumbnail:brand:retail_price: fee_rate:  description: detail

  try {
    var brand = await Brand.findOrCreate({ where: { value: req.body.brand } });
    brand = brand[0].toJSON();

    var product = await Product.create({
      id: req.body.id,
      category_id: req.body.category,
      retail_price: req.body.retail_price,
      price_id: req.body.price,
      name: req.body.name,
      link: req.body.link,
      thumbnail: req.body.thumbnail,
      brand_id: brand.id,
      fee_rate: req.body.fee_rate,
      description: req.body.description,
      detail: req.body.detail,
    });

    product = product.toJSON();

    await ProductImage.bulkCreate(
      req.body.images.map((image) => {
        return { product_id: product.id, image_url: image.image_url };
      })
    );

    await ProductAge.bulkCreate(
      req.body.age.map((age) => {
        return { product_id: product.id, age_id: age };
      })
    );

    await ProductGender.bulkCreate(
      req.body.gender.map((gender) => {
        return { product_id: product.id, gender };
      })
    );

    res.status(200).json({ success: true, product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.update(
      { deleted: true },
      { where: { id: req.params.product_id } }
    );
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getFilterdProduct,
  getProductDetail,
  postProduct,
  patchProduct,
  deleteProduct,
};
