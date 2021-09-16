const {
  Orders,
  Receiver,
  Product,
  Price,
  User,
  ProductImage,
} = require("../models");
const dataNotExist = async (name, model, condition) => {
  var data = await model.findOne({ where: condition });
  if (!data) throw new Error(`${name} not Exist`);
};

module.exports = { dataNotExist };
