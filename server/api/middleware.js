const adminCheck = (req, res, next) => {
  if (req.user && req.user.adminStatus) {
    next();
  } else {
    res.sendStatus(403);
  }
};

const userOrAdminCheck = (req, res, next) => {
  if (req.params.id === req.user.id || req.user.adminStatus) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  adminCheck,
  userOrAdminCheck,
};
