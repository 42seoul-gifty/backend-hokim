const {
  User,
  Receiver,
  Product,
  Price,
  Age,
  Feature,
  Brand,
  Category,
} = require("../models");

const getAdminFilterdProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Price, attributes: ["id", "value"] },
        { model: Age, attributes: ["id", "value"] },
        { model: Feature, attributes: ["id", "value"] },
        { model: Brand, attributes: ["id", "value"] },
        { model: Category, attributes: ["id", "value"] },
      ],
    });

    res.status(200).json({ success: true, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdUser = async (req, res) => {
  try {
    const user = await User.findAll({});
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAdminFilterdReceiver = async (req, res) => {
  try {
    const receiver = await Receiver.findAll({
      include: [
        { model: Price, attributes: ["id", "value"] },
        { model: Age, attributes: ["id", "value"] },
        { model: Feature, attributes: ["id", "value"] },
      ],
    });
    res.status(200).json({ success: true, receiver });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAdminFilterdProduct,
  getAdminFilterdUser,
  getAdminFilterdReceiver,
};
