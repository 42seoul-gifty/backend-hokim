const checkAdminMode = (req, res, next) => {
  if (!req.isAuthenticated()) req.isAdmin = 0;
  else req.isAdmin = 1;

  next();
};

module.exports = { checkAdminMode };
