const router = require("express").Router();
const {
  models: { Order, Product, OrderItem, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allOrdersNotComplete = await Order.findAll({
      where: {
        isComplete: false,
      },
    });
    res.json(allOrdersNotComplete);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderById = await Order.findByPk(req.params.id);
    res.json(orderById);
  } catch (err) {
    next(err);
  }
});

//get the orderId by userId
router.get("/user/:userId", async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      include: User,
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
    });
    res.json(userOrder);
  } catch (err) {
    next(err);
  }
});

// get all products in one cart by orderId
router.get("/:id/products", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: [
        {
          model: Order,
          where: {
            id: req.params.id,
          },
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:orderId/:productId", async (req, res, next) => {
  try {
    const deletedProduct = await OrderItem.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    deletedProduct.destroy();
    res.json(deletedProduct);
  } catch (err) {
    next(err);
  }
});

router.put("/:orderId/:productId", async (req, res, next) => {
  try {
    const toBeUpdated = await OrderItem.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    const updatedProduct = await toBeUpdated.update({
      ...toBeUpdated,
      quantity: req.body.quantity,
    });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

//get all productId in a order by orderId
router.get("/:orderId/productIds", async (req, res, next) => {
  try {
    const data = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Order.create(req.body, {
      include: [{ model: Product }, { model: User }],
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});
