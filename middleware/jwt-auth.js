const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateRefreshToken = async (req, res, user) => {
  try {
    const newRefreshToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "14d",
      issuer: "gifty",
    });
    await User.update({ token: newRefreshToken }, { where: { id: user.id } });

    res.cookie("refreshToken", newRefreshToken);
    req.cookies.refreshToken = newRefreshToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const generateAccessToken = (req, res, user) => {
  try {
    const newAccessToken = jwt.sign(
      { id: user.id, auth: user.auth, date: new Date() },
      process.env.JWT_SECRET,
      { expiresIn: "1m", issuer: "gifty" }
    );

    res.cookie("accessToken", newAccessToken);
    req.cookies.accessToken = newAccessToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const checkRefreshToken = async (req, verifyRefresh) => {
  const user = await User.findOne({
    where: { token: req.cookies.refreshToken },
  });
  if (user && verifyRefresh) return user;
  return false;
};

const checkVerify = (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    return verify;
  } catch (e) {
    return null;
  }
};

const decodeToken = async (req, res, next) => {
  try {
    if (!req.cookies.accessToken) throw Error("token does not exist.");
    const verifyAccess = checkVerify(req.cookies.accessToken);
    const verifyRefresh = checkVerify(req.cookies.refreshToken);

    if (!verifyAccess) {
      const user = await checkRefreshToken(req, verifyRefresh);
      if (user) {
        generateAccessToken(req, res, user);
      }
    } else if (!verifyRefresh) {
      await generateRefreshToken(req, res, verifyAccess);
    }
    req.user = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

const generateToken = async (req, res, user) => {
  try {
    generateAccessToken(req, res, user);
    await generateRefreshToken(req, res, user);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { generateToken, decodeToken };
