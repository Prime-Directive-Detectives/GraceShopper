const products = [
  {
    name: "Sportswear Tech Essentials Pullover Hoodie",
    price: 6500,
    type: "Clothing",
    gender: "Male",
    color: "olive",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1b4a4c32-370e-499d-a6e5-aacc5e13fcf7/sportswear-style-essentials-mens-long-sleeve-mock-neck-top-SkfSc5.png",
    stock: 20,
    description:
      "The Nike Sportswear Style Essentials Mock Neck Top is an easy-fitting layer made with soft organic cotton. Thoughtful details like a drop tail hem, rib trims and a zippered back pocket make this cozy style a welcome addition to any cold-weather wardrobe. This product is made with at least 75% organic cotton fibers.",
  },
  {
    name: "Sportswear Tech Essentials Commuter Pants",
    price: 5500,
    type: "Clothing",
    gender: "Male",
    color: "black",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4e640110-6190-4c03-91ef-332c7d6f3358/sportswear-tech-essentials-mens-unlined-commuter-pants-P7nF2P.png",
    stock: 20,
    description:
      "As comfortable in an office chair as they are on the move, the Nike Sportswear Tech Essentials Commuter Pants blur the lines between city and athletic style. The commuter fit features signature details and an unlined mid-weight woven fabric for an elevated look and premium feel perfect for everyday wear.",
  },
  {
    name: "Allover Print Parka",
    price: 12000,
    type: "Clothing",
    gender: "Male",
    color: "green",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d05d86b5-7764-48f5-ad4b-b18533db4cd7/jordan-flight-heritage-mens-allover-print-parka-f3h0QM.png",
    stock: 20,
    description:
      "Keep warm and look good throughout the winter in the Jordan Flight Heritage Parka. Insulated with light, fluffy down, its long length and double-layer closure help block out the cold weather.",
  },
  {
    name: "Sportswear Windrunner",
    price: 7000,
    type: "Clothing",
    gender: "Male",
    color: "white",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/45c1b5a1-62c5-4b57-9e1e-5cf6c3f728c3/sportswear-windrunner-mens-hooded-jacket-5hK13x.png",
    stock: 20,
    description:
      "The Nike Sportswear Windrunner Jacket updates our first running windbreaker with lightweight fabric made from recycled materials. Design details pulled from the original version provide a heritage Nike look. This product is made with 100% recycled polyester fibers.",
  },
  {
    name: "Nike Yoga Full-Zip Hoodie",
    price: 8500,
    type: "Clothing",
    gender: "Male",
    color: "grey",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/591d73e1-a9e0-46f6-b520-d4270a328461/yoga-mens-full-zip-hoodie-hsCcjD.png",
    stock: 20,
    description:
      "The Nike Yoga Hoodie gives you soft, lightweight coverage that stretches and wicks sweat while you warm up or cool down on the mat. Thumbholes keep it streamlined as you move. This product is made with at least 75% sustainable materials, using a blend of both recycled polyester and organic cotton fibers. The blend is at least 10% recycled fibers or at least 10% organic cotton fibers.",
  },
  {
    name: "Sportswear Essential Crop Top",
    price: 3000,
    type: "Clothing",
    gender: "Female",
    color: "seafoam",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e2c2e317-dac7-40c3-b3b8-6199e43da14e/sportswear-essential-womens-crop-top-G8J8gJ.png",
    stock: 20,
    description:
      "Made to pair with your favorite shorts and leggings, the Nike Sportswear Essential Crop Top is a go-to styling piece with a body-skimming fit and printed graphic.",
  },
  {
    name: "Sportswear Essentials Curve Woven High-Rise Pants",
    price: 8000,
    type: "Clothing",
    gender: "Female",
    color: "white",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/31d73c74-a7c4-4113-a39c-7db14c0c5a55/sportswear-essentials-womens-curve-woven-high-rise-pants-Tl1d58.png",
    stock: 20,
    description:
      "Let's face it. We can't stay pantless forever. As we prime ourselves for more coffee runs and endless commutes, we need a good pair of pants to go the extra mile with us. These roomy pants can keep up, stay up, and hold their shape (even during video calls). Now the only question is, what shoes will you wear?",
  },
  {
    name: "Dri-FIT Cropped Tank",
    price: 4500,
    type: "Clothing",
    gender: "Female",
    color: "pink",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8aad0920-4946-47da-b27a-a54990c02117/pro-dri-fit-womens-cropped-tank-clWpVJ.png",
    stock: 20,
    description:
      "The Nike Pro Dri-FIT Tank keeps you dry and moving freely during high-heat workouts and competitions. Breathable fabric in the back lets cool air in while a shelf-bra in the front gives you the lasting confidence of gentle support. This product is made with at least 75% recycled polyester fibers.",
  },
  {
    name: "Sportswear Therma-FIT Repel",
    price: 13000,
    type: "Clothing",
    gender: "Female",
    color: "bronze",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9278b48e-3eb4-4258-b3ef-1903c59ddf6e/sportswear-therma-fit-repel-womens-hooded-jacket-f94XdP.png",
    stock: 20,
    description:
      "The Nike Sportswear Therma-FIT Jacket upgrades a favorite Nike layer. Its Repel weather-resistant fabric and insulation are both made with recycled polyester derived from plastic bottles. A scuba hood design and easy to layer fit make it a go-to cold-weather staple. This product is made with at least 50% recycled polyester fibers.",
  },
  {
    name: "Dri-FIT One Luxe Buckle Mid-Rise Leggings",
    price: 7000,
    type: "Clothing",
    gender: "Female",
    color: "red",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3f5bfb34-329b-4c07-84c2-312f185ccd08/dri-fit-one-luxe-buckle-womens-mid-rise-leggings-c94M2s.png",
    stock: 20,
    description:
      "The Nike Dri-FIT One Luxe Leggings get updated with buckle details inspired by luxury swimwear. Made with silky soft fabric that you can't see through, they keep you confidently covered for any workout—or anytime. Part of the Nike Luxe line, these comfortable leggings are the second skin you'll want to live in. They're made with at least 50% recycled polyester fibers.",
  },
  {
    name: "24oz Bottle",
    price: 2000,
    type: "Accessories",
    gender: "Female",
    color: "red",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/a92b7d2c-cadb-4b83-bacd-b7d16963f5d2/24oz-tr-hypercharge-shaker-bottle-p8wgMz.png",
    stock: 19,
    description:
      "Mix things up with the Nike 24oz TR HyperCharge Shaker Bottle. An integrated mixer evenly blends powders and supplements into your drink for a pre- or post-workout boost, while a curved interior base makes it easy to clean. The flip-top spout features a leakproof seal for peace of mind.",
  },
  {
    name: "Waistpack",
    price: 3000,
    type: "Accessories",
    gender: "Male",
    color: "green",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/445d8c50-08ef-4958-ae81-6462dba7b972/sportswear-heritage-winterized-waistpack-3l-wxGkkn.png",
    stock: 35,
    description:
      "Ready for cold, wet weather, the Nike Heritage Waistpack features durable, water-resistant fabric to help keep your essentials organized and dry. The main compartment provides secure storage for your phone, snacks or wallet while the smaller accessories pocket on the backside helps keep things like your keys stay safe and close at hand. This product is made with at least 50% recycled polyester fibers.",
  },
  {
    name: "Running Cap",
    price: 2600,
    type: "Accessories",
    gender: "Female",
    color: "yellow",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/05835ad1-1711-462d-a7f7-b05f63a5471b/dri-fit-tailwind-fast-air-running-cap-5dddj6.png",
    stock: 65,
    description:
      "Sleek and cool, the Nike Dri-FIT Tailwind Fast Cap helps keep you covered through your miles. It features art by Nathan Bell, detailing the motivational journey of the short and long-distance runner. This product is made with at least 50% recycled polyester fibers.",
  },
  {
    name: "Yoga Mat",
    price: 11000,
    type: "Accessories",
    gender: "Male",
    color: "black",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a2462d31-b525-489c-a891-66fe4592e990/mastery-yoga-mat-2pLbvv.png",
    stock: 72,
    description:
      "The Nike Mastery Yoga Mat is made with natural rubber that has a stone look. It creates a grippy surface that's designed to feel cool to the touch so you can work on your poses with minimal distractions. Anti-odor construction helps keep it fresh, while a lightweight design makes it easy to carry so you can find your inner sanctuary wherever you go. Even better, it's made with at least 20% recycled materials.",
  },
  {
    name: "Training Backpack",
    price: 9000,
    type: "Accessories",
    gender: "Female",
    color: "red",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1b227b1e-8f53-48c5-b1a4-977812f18a24/utility-power-training-backpack-32l-Njsc4M.png",
    stock: 23,
    description:
      "The Nike Utility Power Backpack keeps your gear close and organized while you're commuting to and from training sessions. Cushioned straps give you comfort on the go, and the pack butterflies open for easy access to your necessities.",
  },
  {
    name: "Duffel Bag",
    price: 17500,
    type: "Accessories",
    gender: "Male",
    color: "yellow",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ed971674-a009-4dfe-b38a-1c7ec2e1ba11/shield-rpm-duffel-30l-NR0gSq.png",
    stock: 81,
    description:
      "Designed with rainy days in mind, the Nike RPM Shield Duffel is made with a coated matte ripstop fabric and weatherproof zippers to keep your gear dry no matter the weather. Details like daisy chain webbing and exterior pockets provide additional storage while reflective binding frames the main compartment for an elevated look.",
  },
  {
    name: "Beanie",
    price: 3800,
    type: "Accessories",
    gender: "Female",
    color: "orange",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/962eebae-5276-4328-9147-3633d15fce3d/jordan-utility-beanie-thFX42.png",
    stock: 87,
    description:
      "Brave the chilly weather with the Nike ACG Beanie in tow. Its cuffed design delivers a secure fit and a warm feel for those chilly weather hikes.",
  },
  {
    name: "Recovery Ball",
    price: 2500,
    type: "Accessories",
    gender: "Male",
    color: "black",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/bf0da4b7-87ac-4da7-b15f-5d8c5bd38e11/recovery-ball-ZpXWFx.png",
    stock: 46,
    description:
      "Get back to what you love with the Nike Recovery Ball. High-density material in a compact, portable design provides intense pressure where you need it most for a concentrated massage. The textured surface targets specific muscle groups, so you'll be ready for your next workout.",
  },
  {
    name: "Recovery Foam Roller",
    price: 4000,
    type: "Accessories",
    gender: "Female",
    color: "yellow",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/449526d2-d38e-41b1-b0fc-24d82e26af94/recovery-foam-roller-w8Qdk7.png",
    stock: 87,
    description:
      "The Nike Foam Roller features a firm, hollow plastic core and a textured surface for an intense massage that targets specific muscle groups. Its lightweight, portable design lets you take it wherever you put in the work.",
  },
  {
    name: "Kyrie Crossbody Bag",
    price: 4500,
    type: "Accessories",
    gender: "Male",
    color: "red",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9bb16fdb-b5d0-40f8-af88-20e8e0c11a4f/jordan-crossbody-bag-RGcT2n.png",
    stock: 28,
    description:
      "Keep your essential safe and within easy reach with the Kyrie Crossbody Bag. Lightweight and compact, it helps organize small items with the zippered compartment and expandable front pocket. Plus, you can attach extra gear to the D-ring, cord loop or webbing loop.",
  },
  {
    name: "Nike Air Force 1 Shadow",
    price: 10000,
    type: "Shoes",
    gender: "Female",
    color: "Yellow",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/03afafbd-ddde-4479-9da7-1afd641198ed/air-force-1-shadow-womens-shoes-wgQ72d.png",
    stock: 80,
    description:
      "The Nike Air Force 1 Shadow puts a playful twist on a classic b-ball design. Using a layered approach, doubling the branding and exaggerating the midsole, it highlights AF1 DNA with a bold, bright look. Double the smiles for every mile.",
  },
  {
    name: "Nike Metcon 7",
    price: 6000,
    type: "Shoes",
    gender: "Female",
    color: "Red",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/a61a1912-cb5d-460a-ab35-12aeac951c77/metcon-7-womens-training-shoes-wgK0XX.png",
    stock: 80,
    description:
      "The Nike Metcon 7 is the gold standard for weight training—even tougher and more stable than previous versions. We've also added React foam that ups the comfort to keep you ready for high-intensity cardio. Plus, a tab locks down your laces so you can forget about them coming untied when you're focused on your next PR.",
  },
  {
    name: "Nike ZoomX Invincible Run Flyknit",
    price: 8000,
    type: "Shoes",
    gender: "Female",
    color: "Grey",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/5c1959d1-961f-4e3c-b9f6-ebb4aaf941ca/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
    stock: 80,
    description:
      "Get after those long runs with lightweight, responsive foam that delivers a soft feel with every step. A Flyknit upper gives your foot breathability where you need it most and secure fit you can depend on. Designed for maximum shock absorption with a wider forefoot for stability and a more curved outsole for easier heel-to-toe transitions As one of our most tested shoes, lace up and feel the potential when your foot hits the pavement.",
  },
  {
    name: "Nike Air Force 1 '07",
    price: 5000,
    type: "Shoes",
    gender: "Female",
    color: "White",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f094af40-f82f-4fb9-a246-e031bf6fc411/air-force-1-07-womens-shoes-GCkPzr.png",
    stock: 80,
    description:
      "The radiance lives on in the Nike Air Force 1 ’07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine.",
  },
  {
    name: "Nike React Infinity Run Flyknit 2",
    price: 7000,
    type: "Shoes",
    gender: "Female",
    color: "Grey",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/78629828-4bd6-4584-b7f2-39405e6d066d/react-infinity-run-flyknit-2-womens-road-running-shoes-rfh6Z8.png",
    stock: 80,
    description:
      "The Nike React Infinity Run Flyknit 2 continues to help keep you running. A refreshed upper combines Flyknit and Flywire technology for support and breathability where you need it. A wider forefoot provides stability to prevent rolling, while the high foam heights provide soft responsiveness and long-lasting comfort. It's still one of our most tested shoes, designed to help you feel the potential when your foot hits the pavement.",
  },
  {
    name: "Nike Air Max 270",
    price: 7500,
    type: "Shoes",
    gender: "Male",
    color: "White",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/awjogtdnqxniqqk0wpgf/air-max-270-mens-shoes-KkLcGR.png",
    stock: 80,
    description:
      "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
  },
  {
    name: "Nike SB Zoom Blazer Mid Premium",
    price: 7000,
    type: "Shoes",
    gender: "Male",
    color: "Black",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0b6471b7-716e-4160-92d6-35a7e109fee0/sb-zoom-blazer-mid-premium-skate-shoes-jcsrxf.png",
    stock: 80,
    description:
      "Blaze trails in the Nike SB Zoom Blazer Mid Premium. This rebuilt classic overlays durable suede and classic canvas with zig-zag stitching that's inspired by classic hiking footwear. Webbing pull straps, a felted collar and rope laces complete the look.",
  },
  {
    name: "Nike Blazer",
    price: 8000,
    type: "Shoes",
    gender: "Male",
    color: "Dark Blue",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-vintage-mens-shoes-nw30B2.png",
    stock: 80,
    description:
      "In the ‘70s, Nike was the new shoe on the block. So new in fact, we were still breaking into the basketball scene and testing prototypes on the feet of our local team. Of course, the design improved over the years, but the name stuck. The Nike Blazer Mid ’77 Vintage—classic since the beginning.",
  },
  {
    name: "Nike Blazer Mid '77 Vintage",
    price: 6000,
    type: "Shoes",
    gender: "Male",
    color: "Black",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cf93e964-6591-4bf2-8f98-9a8ce061c101/pegasus-trail-3-gore-tex-mens-waterproof-trail-running-shoes-HG005k.png",
    stock: 97,
    description:
      "In the ‘70s, Nike was the new shoe on the block. So new in fact, we were still breaking into the basketball scene and testing prototypes on the feet of our local team. Of course, the design improved over the years, but the name stuck. The Nike Blazer Mid ’77 Vintage—classic since the beginning.",
  },
  {
    name: "Nike Air Zoom Pegasus 38",
    price: 4000,
    type: "Shoes",
    gender: "Male",
    color: "Grey",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/212a947c-2f1e-4c35-9dc1-3b588b8f35ff/air-zoom-pegasus-38-mens-road-running-shoes-lq7PZZ.png",
    stock: 18,
    description:
      "The road is your runway. Get ready to take flight in the workhorse with wings. Back with extra bounce that’s perfect for hitting the pavement. Whether you’re racking up everyday miles or on your long run, feel the spring in your step with the same cushioned support as its predecessor. Breathable mesh in the upper combines the comfort and durability you want with a wider fit at the toes.",
  },
];

module.exports = products;
