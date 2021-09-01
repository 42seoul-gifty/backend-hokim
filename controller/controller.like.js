const { Like } = require("../models");

const getAllLike = async (req, res) => {
  try {
    const likes = await Like.findAll({
      like: true,
    });
    res.status(200).json({ success: true, likes });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAllDislike = async (req, res) => {
  try {
    const likes = await Like.findAll({
      like: false,
    });
    res.status(200).json({ success: true, likes });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const postLike = async (req, res, like) => {
  try {
    await Like.create({
      like: like,
      receiver_id: req.body.receiver_id,
      product_id: req.params.product_id,
    });
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAllLike,
  getAllDislike,
  postLike,
};
