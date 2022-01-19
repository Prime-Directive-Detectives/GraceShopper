const router = require("express").Router();
const _ = require("lodash");
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

//get orderId by userId
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

router.delete("/:orderId/orderItems", async (req, res, next) => {
  try {
    const deleteUserOrder = await OrderItem.destroy({
      where: {
        orderId: req.params.orderId,
      },
    });
    console.log("Look here", deleteUserOrder);
    res.json(deleteUserOrder);
  } catch (err) {
    next(err);
  }
});

// get all products in a order by orderId
router.get("/:id/products", async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: [
        {
          model: Order,
          where: {
            id: req.params.id,
            isComplete: false,
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

// delete product in order by orderId and productId
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

// update product qty by orderId and productId
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

//get all productIds with qty in a order by orderId
router.get("/:orderId/productIds", async (req, res, next) => {
  try {
    const allProducts = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
});

// get product by orderId and productId
router.get("/:orderId/:productId", async (req, res, next) => {
  try {
    const product = await OrderItem.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId,
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//find or create order by userId
router.get("/user/:userId/foc", async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      include: User,
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

//add product to order by orderId and productId
router.post("/:orderId/:productId", async (req, res, next) => {
  try {
    const newProduct = await OrderItem.create({
      orderId: req.params.orderId,
      productId: req.params.productId,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = _.pick(req.body, [
      "email",
      "address",
      "city",
      "state",
      "zip",
      "cost",
    ]);
    const newData = await Order.findByPk(req.params.id);
    await newData.update({
      ...body,
      isComplete: true,
    });
    res.json(newData);
  } catch (err) {
    next(err);
  }
});
//add product to order by orderId and productId with qty
router.post("/:orderId/:productId/:qty", async (req, res, next) => {
  try {
    const newProduct = await OrderItem.create({
      orderId: req.params.orderId,
      productId: req.params.productId,
      quantity: req.params.qty,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});
