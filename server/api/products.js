const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

// GET ROUTE FOR ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET ROUTE FOR ALL MALE PRODUCTS
router.get("/male", async (req, res, next) => {
  try {
    const maleProducts = await Product.findAll({
      where: {
        gender: "Male",
      },
    });
    res.json(maleProducts);
  } catch (err) {
    next(err);
  }
});
// GET ROUTE FOR ALL FEMALE PRODUCTS
router.get("/female", async (req, res, next) => {
  try {
    const femaleProducts = await Product.findAll({
      where: {
        gender: "Female",
      },
    });
    res.json(femaleProducts);
  } catch (err) {
    next(err);
  }
});
// GET ROUTE FOR ALL Accessories
router.get("/accessories", async (req, res, next) => {
  try {
    const femaleProducts = await Product.findAll({
      where: {
        type: "Accessories",
      },
    });
    res.json(femaleProducts);
  } catch (err) {
    next(err);
  }
});
// GET ROUTE FOR SINGLE PRODUCT BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    res.json(singleProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
