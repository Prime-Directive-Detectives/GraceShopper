const router = require("express").Router();
const { adminCheck, userOrAdminCheck } = require("../middleware");
const {
  models: { User },
} = require("../../db");

router.get("/", adminCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "adminStatus",
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", userOrAdminCheck, async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    res.send(findUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", adminCheck, async (req, res, next) => {
  try {
    const editUser = await User.findByPk(req.params.id);
    await editUser.update(req.body);
    res.send(editUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", adminCheck, async (req, res, next) => {
  try {
    const deleteUser = await User.findByPk(req.params.id);
    await deleteUser.destroy();
    res.send(deleteUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
