const { User } = require("../models");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.user_id },
    });

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  getUser,
};
