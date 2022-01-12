const router = require("express").Router();
const {
	models: { Cart, Product, CartItem, User },
} = require("../db/");
module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const allCarts = await Cart.findAll();
		res.json(allCarts);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const cartById = await Cart.findByPk(req.params.id);
		res.json(cartById);
	} catch (err) {
		next(err);
	}
});

//get the cartId by userId
router.get("/user/:userId", async (req, res, next) => {
	try {
		const userCart = await Cart.findAll({
			include: User,
			where: {
				id: req.params.userId,
			},
		});
		res.json(userCart);
	} catch (err) {
		next(err);
	}
});

// router.get("/:id/products", async (req, res, next) => {
// 	try {
// 		const data = await Product.findAll({
// 			include: [
// 				{
// 					model: Cart,
// 					through: {
// 						where: {
// 							cartId: req.params.id,
// 						},
// 					},
// 				},
// 			],
// 		});
// 		res.json(data);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.get("/:id/products", async (req, res, next) => {
// 	try {
// 		const data = await Product.findAll({
// 			through: {
// 				cartId: req.params.id,
// 			},
// 		});
// 		res.json(data);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// get all products in one cart by cartId
router.get("/:id/products", async (req, res, next) => {
	try {
		const data = await Product.findAll({
			include: [
				{
					model: Cart,
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
