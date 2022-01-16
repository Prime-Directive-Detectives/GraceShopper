const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("orderItem", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		validate: {
			max: 10,
		},
	},
});

module.exports = OrderItem;
