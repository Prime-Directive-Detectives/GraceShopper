const { ModuleFilenameHelpers } = require("webpack");

const products = [
  {
    name: "sed",
    price: 3.71,
    type: "Clothing",
    gender: "Female",
    imageUrl: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
    stock: 19,
    description:
      "sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia",
  },
  {
    name: "gravida",
    price: 8.07,
    type: "Accessories",
    gender: "Male",
    imageUrl: "http://dummyimage.com/123x100.png/ff4444/ffffff",
    stock: 35,
    description:
      "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus",
  },
  {
    name: "nisl",
    price: 1.57,
    type: "Shoes",
    gender: "Male",
    imageUrl: "http://dummyimage.com/149x100.png/5fa2dd/ffffff",
    stock: 65,
    description:
      "libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar",
  },
  {
    name: "pulvinar",
    price: 3.15,
    type: "Accessories",
    gender: "Male",
    imageUrl: "http://dummyimage.com/103x100.png/cc0000/ffffff",
    stock: 72,
    description:
      "odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices",
  },
  {
    name: "luctus",
    price: 9.78,
    type: "Accessories",
    gender: "Male",
    imageUrl: "http://dummyimage.com/194x100.png/5fa2dd/ffffff",
    stock: 23,
    description:
      "in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin",
  },
  {
    name: "nonummy",
    price: 3.35,
    type: "Clothing",
    imageUrl: "http://dummyimage.com/122x100.png/5fa2dd/ffffff",
    gender: "Male",
    stock: 81,
    description:
      "et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl",
  },
  {
    name: "ante",
    price: 6.78,
    type: "Clothing",
    gender: "Male",
    imageUrl: "http://dummyimage.com/204x100.png/5fa2dd/ffffff",
    stock: 87,
    description:
      "ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat",
  },
  {
    name: "awfgx",
    price: 7.11,
    type: "Accessories",
    gender: "Male",
    imageUrl: "http://dummyimage.com/131x100.png/ff4444/ffffff",
    stock: 46,
    description: "et tempus semper est quam pharetra magna ac consequat metus",
  },
  {
    name: "orci",
    price: 1.18,
    type: "Shoes",
    gender: "Male",
    imageUrl: "http://dummyimage.com/146x100.png/dddddd/000000",
    stock: 87,
    description:
      "duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget",
  },
  {
    name: "felis",
    price: 2.49,
    type: "Accessories",
    gender: "Male",
    imageUrl: "http://dummyimage.com/175x100.png/dddddd/000000",
    stock: 28,
    description:
      "at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci",
  },
  {
    name: "elementum",
    price: 6.49,
    type: "Accessories",
    gender: "Female",
    imageUrl: "http://dummyimage.com/248x100.png/5fa2dd/ffffff",
    stock: 38,
    description:
      "proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis",
  },
  {
    name: "dui",
    price: 6.41,
    type: "Clothing",
    gender: "Female",
    imageUrl: "http://dummyimage.com/222x100.png/dddddd/000000",
    stock: 75,
    description:
      "vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet",
  },
  {
    name: "auctor",
    price: 7.97,
    type: "Clothing",
    imageUrl: "http://dummyimage.com/100x100.png/dddddd/000000",
    gender: "Female",
    stock: 55,
    description:
      "leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor",
  },
  {
    name: "luctusss",
    price: 2.57,
    type: "Clothing",
    gender: "Female",
    imageUrl: "http://dummyimage.com/113x100.png/ff4444/ffffff",
    stock: 69,
    description:
      "fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio",
  },
  {
    name: "quam",
    price: 3.34,
    type: "Accessories",
    gender: "Female",
    imageUrl: "http://dummyimage.com/184x100.png/5fa2dd/ffffff",
    stock: 50,
    description:
      "sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam",
  },
  {
    name: "vel",
    price: 5.4,
    type: "Clothing",
    imageUrl: "http://dummyimage.com/115x100.png/5fa2dd/ffffff",
    gender: "Female",
    stock: 17,
    description:
      "amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien",
  },
  {
    name: "est",
    price: 3.03,
    type: "Shoes",
    gender: "Female",
    imageUrl: "http://dummyimage.com/174x100.png/dddddd/000000",
    stock: 90,
    description:
      "integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam",
  },
  {
    name: "vasdfel",
    price: 3.01,
    type: "Accessories",
    gender: "Female",
    imageUrl: "http://dummyimage.com/162x100.png/cc0000/ffffff",
    stock: 80,
    description:
      "massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet",
  },
  {
    name: "lorem",
    price: 9.33,
    type: "Accessories",
    gender: "Male",
    imageUrl: "http://dummyimage.com/229x100.png/ff4444/ffffff",
    stock: 97,
    description:
      "sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet",
  },
  {
    name: "pellentesque",
    price: 3.23,
    type: "Clothing",
    gender: "Female",
    imageUrl: "http://dummyimage.com/163x100.png/5fa2dd/ffffff",
    stock: 18,
    description:
      "augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean",
  },
];

module.exports = products;
