const Sequelize = require("../../models").Sequelize;
const { productIncludeMutipleFilter } = require("../../lib/lib.Product");
const { Op } = require("sequelize");
const { logger } = require("../../config/winston");
const {
  Product,
  ProductImage,
  ProductGender,
  ProductAge,
  Category,
  Brand,
  Likes,
  Receiver,
} = require("../../models");

const getAdminFilterdProduct = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 0;
    const limit = 10;

    const include = productIncludeMutipleFilter(
      req.body.gender,
      req.body.price,
      req.body.age
    );
    include.push(
      { model: Brand, attributes: ["id", "value"] },
      { model: Category, attributes: ["id", "value"] }
    );

    const condition = req.body.category.map((elem) => {
      return { category_id: elem };
    });
    include.push(
      { model: Receiver, attributes: [] },
      { model: Likes, attributes: [] }
    );
    const products = await Product.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("Likes.likes")), "view_count"],
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal("CASE WHEN Likes.likes = 1 THEN 1 ELSE 0 END")
            ),
            "like_count",
          ],

          "id",
          [
            Sequelize.fn(
              "SUM",
              Sequelize.literal(
                "CASE WHEN Receivers.product_id is not null THEN 1 ELSE 0 END"
              )
            ),
            "order_count",
          ],
        ],
      },
      include,
      group: ["Product.id"],
      where: condition.length == 0 ? {} : { [Op.or]: condition },
      offset: page * limit,
      limit: limit,
      subQuery: false,
    });

    var totalPage = await Product.count({
      include,
      where: condition.length == 0 ? {} : { [Op.or]: condition },
    });

    totalPage =
      totalPage % limit == 0
        ? Math.floor(totalPage / limit) - 1
        : Math.floor(totalPage / limit);

    res.status(200).json({ success: true, products, page, totalPage });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const patchProduct = async (req, res) => {
  //id: image:  gender: age: price
  //:category: name: link:thumbnail:brand:retail_price: fee_rate:  description: detail
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
      req.body.gender.map((gender_id) => {
        return { product_id: req.body.id, gender_id };
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
    logger.error(e);
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
      req.body.gender.map((gender_id) => {
        return { product_id: product.id, gender_id };
      })
    );

    res.status(200).json({ success: true, product });
  } catch (e) {
    logger.error(e);
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
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const restoreProduct = async (req, res) => {
  try {
    await Product.update(
      { deleted: false },
      { where: { id: req.params.product_id } }
    );
    res.status(200).json({ success: true });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAdminFilterdProduct,
  postProduct,
  patchProduct,
  restoreProduct,
  deleteProduct,
};
