const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	isComplete: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Order;
