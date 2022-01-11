//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/Order-item");
const Cart = require("./models/Cart");
const CartItem = require("./models/Cart-item");

//associations could go here!

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});

Order.belongsTo(User);
User.hasMany(Order);
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
    Cart,
    CartItem,
  },
};
