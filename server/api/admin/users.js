const router = require("express").Router();

const {
  models: { User },
} = require("../../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "password",
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

router.put("/:id", async (req, res, next) => {
  try {
    const editUser = await User.findByPk(req.params.id);
    await editUser.update(req.body);
    res.send(editUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await User.findByPk(req.params.id);
    await deleteUser.destroy();
    res.send(deleteUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
