const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;
const { adminCheck, userOrAdminCheck } = require("./middleware");

router.get("/", adminCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", userOrAdminCheck, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id);
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const addUser = await User.create(req.body);
    res.status(201).json(addUser);
  } catch (err) {
    next(err);
  }
});
