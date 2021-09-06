const { User } = require("../models");
const { findAdminFilteredProduct } = require("../lib/lib.Product");

const { getAdminUsers } = require("../lib/lib.User");
const { findFilteredReceiver } = require("../lib/lib.Receiver");

const getAdminFilterdProduct = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log(req.body);
    const user = await User.destroy({ where: { id: req.params.user_id } });
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
  removeUser,
};
