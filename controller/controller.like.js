const { Likes } = require("../models");

const getAllLike = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      likes: true,
    });
    res.status(200).json({ success: true, likes });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getAllDislike = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      likes: false,
    });
    res.status(200).json({ success: true, likes });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAllLike,
  getAllDislike,
};
