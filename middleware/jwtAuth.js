const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { logger } = require("../config/winston");

const generateRefreshToken = async (user) => {
  try {
    const newRefreshToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "14d",
      issuer: "gifty",
    });
    await User.update({ token: newRefreshToken }, { where: { id: user.id } });

    return newRefreshToken;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

const generateAccessToken = (user) => {
  try {
    const newAccessToken = jwt.sign(
      { id: user.id, auth: user.auth, date: new Date() },
      process.env.JWT_SECRET,
      { expiresIn: "1m", issuer: "gifty" }
    );

    return newAccessToken;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

const checkRefreshToken = async (req, verifyRefresh) => {
  const user = await User.findOne({
    where: { token: req.body.refresh_token },
  });
  if (user && verifyRefresh) return user;
  return null;
};

const checkVerify = (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    return verify;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

const decodeToken = async (req, res, next) => {
  try {
    var access_token = req.header("Authorization");
    if (!access_token) throw Error("token does not exist.");
    const verifyAccess = checkVerify(access_token);

    if (!verifyAccess) throw new Error("Access token expired");

    req.user = jwt.verify(access_token, process.env.JWT_SECRET);

    if (req.params.user_id && req.user.id != req.params.user_id)
      throw new Error("No permission");

    next();
  } catch (e) {
    logger.error(e);
    res.status(403).json({ success: false, error: e.message });
  }
};

const generateToken = async (user) => {
  const access_token = generateAccessToken(user);
  const refresh_token = await generateRefreshToken(user);
  return { access_token, refresh_token };
};

const generateTokenFromRefresh = async (req) => {
  const verifyRefresh = checkVerify(req.body.refresh_token);
  const user = checkRefreshToken(req, verifyRefresh);
  const access_token = generateAccessToken(user);

  return access_token;
};

module.exports = { generateToken, decodeToken, generateTokenFromRefresh };
