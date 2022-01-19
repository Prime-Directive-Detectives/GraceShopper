const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	isComplete: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true,
		},
	},
	address: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true,
		},
	},
	city: {
		type: Sequelize.STRING,
	},
	state: {
		type: Sequelize.STRING,
		validate: {
			len: [2],
		},
	},
	zip: {
		type: Sequelize.STRING,
		validate: {
			len: [2],
			isNumeric: true,
		},
	},
	cost: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
});

module.exports = Order;
