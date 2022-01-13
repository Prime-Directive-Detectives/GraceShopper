const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	price: {
		type: Sequelize.INTEGER,
	},
	type: {
		type: Sequelize.ENUM("Shoes", "Clothing", "Accessories"),
	},
	color: {
		type: Sequelize.STRING,
	},
	gender: {
		type: Sequelize.ENUM("Male", "Female"),
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue:
			"https://skotfashion.com/wp-content/uploads/2018/02/placeholder.jpg",
	},
	stock: {
		type: Sequelize.INTEGER,
		validate: {
			min: 5,
		},
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

module.exports = Product;
