const router = require("express").Router();
const {
  models: { Product },
} = require("../../db");

router.post("/add", async (req, res, next) => {
  try {
    const addProduct = await Product.create(req.body);
    res.status(201).json(addProduct);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const editProduct = await Product.findByPk(req.params.id);
    res.send(await editProduct.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByPk(req.params.id);
    await deleteProduct.destroy();
    res.send(deleteProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
