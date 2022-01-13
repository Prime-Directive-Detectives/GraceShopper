const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/order", require("./order.js"));
router.use("/allProducts", require("./products"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
