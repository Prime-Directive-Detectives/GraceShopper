//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/Order-item");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, {
	through: OrderItem,
});
Product.belongsToMany(Order, {
	through: OrderItem,
});

module.exports = {
	db,
	models: {
		User,
		Product,
		Order,
		OrderItem,
	},
};
