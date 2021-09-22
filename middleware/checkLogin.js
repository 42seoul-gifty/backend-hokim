module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) res.redirect("/admin/login");
  else next();
};
