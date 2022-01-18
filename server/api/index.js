const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { adminCheck } = require("./middleware");

router.use("*", async (req, res, next) => {
  if (req.headers.authorization) {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
  }
  next();
});

router.use("/users", require("./users"));
router.use("/order", require("./order.js"));
router.use("/allProducts", require("./products"));
router.use("/admin", adminCheck, require("./admin"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
