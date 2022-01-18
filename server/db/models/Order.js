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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2],
    },
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2],
      isNumeric: true,
    },
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Order;
