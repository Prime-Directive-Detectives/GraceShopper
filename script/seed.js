"use strict";
// const fs = require("fs");
const products = require("./productsData");

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody123@gmail.com",
      password: "123",
      firstName: "Cody",
      lastName: "Chan",
    }),
    User.create({
      username: "murphy",
      email: "murphy123@gmail.com",
      password: "123",
      firstName: "Murphy",
      lastName: "Sod",
    }),
    User.create({
      username: "admin",
      email: "coolguy123@gmail.com",
      password: "123",
      firstName: "Cool",
      lastName: "Guy",
      adminStatus: true,
    }),
  ]);

  await User.create({
    username: "bob",
    password: "123",
    firstName: "Bob",
    lastName: "Cane",
    email: "bob123@gmail.com",
  });

  await Promise.all(
    products.map((product) => {
      return Product.create({
        name: product.name,
        price: product.price,
        type: product.type,
        gender: product.gender,
        color: product.color,
        imageUrl: product.imageUrl,
        stock: product.stock,
        description: product.description,
      });
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
