import Menu from "../models/Menu.js";

const sampleMenu = [
  // 🍕 Pizza (8)
  {
    name: "Capricciosa",
    description: "Mushrooms, artichokes, ham",
    price: 150,
    averagePreparationTime: 1,
    category: "Pizza",
    stock: 50,
    image:
      "https://static.vecteezy.com/system/resources/previews/030/660/303/large_2x/pizza-with-white-background-high-quality-ultra-hd-free-photo.jpg",
  },
  {
    name: "Sicilian",
    description: "Anchovies, onions, herbs",
    price: 180,
    averagePreparationTime: 2,
    category: "Pizza",
    stock: 40,
    image:
      "https://www.realsimple.com/thmb/TRWF9nZ1I48Nxd2QMzfDVMUZjtg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Sicilian-Pizza-with-Shave-Delicata-Salami-Pecorino-Recipe-7825d3b570bc40929e57ef287050c741.jpg",
  },
  {
    name: "margherita",
    description: "Tomato, garlic, oregano",
    price: 200,
    averagePreparationTime: 12,
    category: "Pizza",
    stock: 60,
    image: "https://cdn.uengage.io/uploads/5/image-748189-1752218754.jpeg",
  },
  {
    name: "Pepperoni",
    description: "Spicy pepperoni, mozzarella",
    price: 300,
    averagePreparationTime: 20,
    category: "Pizza",
    stock: 30,
    image:
      "https://www.allrecipes.com/thmb/iXKYAl17eIEnvhLtb4WxM7wKqTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg",
  },
  {
    name: "Farmhouse",
    description: "Bell peppers, onions, mushrooms",
    price: 220,
    averagePreparationTime: 16,
    category: "Pizza",
    stock: 45,
    image: "https://www.dominos.co.in//files/items/_1346164951.jpg",
  },
  {
    name: "Mexican Green Wave",
    description: "Jalapeños, capsicum, spicy sauce",
    price: 240,
    averagePreparationTime: 17,
    category: "Pizza",
    stock: 35,
    image: "https://cdn.uengage.io/uploads/5/image-342266-1715596630.png",
  },
  {
    name: "Cheese Burst",
    description: "Extra cheese overload",
    price: 260,
    averagePreparationTime: 14,
    category: "Pizza",
    stock: 50,
    image: "https://www.dominos.co.in//files/items/_1346164951.jpg",
  },
  {
    name: "Tandoori Paneer",
    description: "Paneer tikka, onions, mint",
    price: 280,
    averagePreparationTime: 18,
    category: "Pizza",
    stock: 40,
    image:
      "https://content.jdmagicbox.com/comp/pune/d7/020pxx20.xx20.121207123930.b7d7/catalogue/hot-pizza-rasta-peth-pune-pizza-outlets-jaih18igmz.jpg",
  },

  // 🍔 Burgers (6)
  {
    name: "Classic Veg Burger",
    description: "Lettuce, tomato, cheese",
    price: 120,
    averagePreparationTime: 10,
    category: "Burger",
    stock: 40,
    image:
      "https://www.howsweeteats.com/wp-content/uploads/2011/04/bbqburgers-6.jpg",
  },
  {
    name: "Paneer Melt Burger",
    description: "Grilled paneer, spicy mayo",
    price: 150,
    averagePreparationTime: 12,
    category: "Burger",
    stock: 35,
    image:
      "https://tastedrecipes.com/wp-content/uploads/2020/11/paneer-burger-5.jpg",
  },
  {
    name: "Volcano Burger",
    description: "Volcano Cheese, spicy mayo",
    price: 150,
    averagePreparationTime: 12,
    category: "Burger",
    stock: 35,
    image:
      "https://xplorio.com/xplorio/content/44602/shutterstock_337714676_e1464126862548_1512631535.jpg?width=960&height=440",
  },
  {
    name: "Chicken BBQ Burger",
    description: "BBQ chicken, onions, cheddar",
    price: 180,
    averagePreparationTime: 15,
    category: "Burger",
    stock: 30,
    image:
      "https://www.howsweeteats.com/wp-content/uploads/2011/04/bbqburgers-6.jpg",
  },
  {
    name: "Double Patty Burger",
    description: "Two patties, cheese, lettuce",
    price: 200,
    averagePreparationTime: 16,
    category: "Burger",
    stock: 25,
    image:
      "https://indifoodbev.com/wp-content/uploads/2020/08/McVeggie-Burger-Double-Patty.jpg",
  },
  {
    name: "Spicy Aloo Tikki Burger",
    description: "Indian-style potato patty",
    price: 110,
    averagePreparationTime: 9,
    category: "Burger",
    stock: 50,
    //  image:""
  },
  {
    name: "Mushroom Swiss Burger",
    description: "Mushrooms, Swiss cheese",
    price: 170,
    averagePreparationTime: 13,
    category: "Burger",
    stock: 30,
    //  image:""
  },

  // 🍝 Pasta (6)
  {
    name: "Alfredo Pasta",
    description: "Creamy white sauce, penne",
    price: 160,
    averagePreparationTime: 14,
    category: "Pasta",
    stock: 40,
    image:
      "https://www.allrecipes.com/thmb/gTibTRJ8MW87L0jMhAvXPjIDD94=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19402-quick-and-easy-alfredo-sauce-DDMFS-4x3-17abb2055c714807944172db9172b045.jpg",
  },
  {
    name: "Arrabbiata Pasta",
    description: "Spicy tomato sauce, garlic",
    price: 150,
    averagePreparationTime: 12,
    category: "Pasta",
    stock: 45,
    image:
      "https://www.giallozafferano.com/images/260-26061/Penne-all-arrabbiata_1200x800.jpg",
  },
  {
    name: "Pesto Pasta",
    description: "Basil pesto, parmesan",
    price: 170,
    averagePreparationTime: 13,
    category: "Pasta",
    stock: 35,
    image:
      "https://www.allrecipes.com/thmb/ALYcbI-A_YYn5jiboWYPE2rt310=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-46982-pesto-pasta-with-chicken-DDMFS-4x3-5e043df9d5174cf4ac53612ee0f5b56e.jpg",
  },
  {
    name: "Mac & Cheese",
    description: "Cheesy elbow pasta",
    price: 140,
    averagePreparationTime: 11,
    category: "Pasta",
    stock: 50,
    image:
      "https://images.services.kitchenstories.io/FQPoYXqopSF8apn6ZCB6uEaXVyk=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R3072-final-photo-2.jpg",
  },
  {
    name: "Lasagna",
    description: "Layered pasta with meat/veg",
    price: 200,
    averagePreparationTime: 20,
    category: "Pasta",
    stock: 30,
    image: "https://delishglobe.com/wp-content/uploads/2024/09/Lasagna.png",
  },
  {
    name: "Spaghetti Bolognese",
    description: "Minced meat tomato sauce",
    price: 190,
    averagePreparationTime: 18,
    category: "Pasta",
    stock: 25,
    image:
      "https://www.inspiredtaste.net/wp-content/uploads/2025/02/Pasta-Carbonara-Recipe-1.jpg",
  },

  // 🥗 Salads (4)
  {
    name: "Greek Salad",
    description: "Feta, olives, cucumber",
    price: 100,
    averagePreparationTime: 8,
    category: "Salad",
    stock: 50,
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-main.jpg",
  },
  {
    name: "Caesar Salad",
    description: "Romaine, parmesan, croutons",
    price: 120,
    averagePreparationTime: 10,
    category: "Salad",
    stock: 40,
    //  image:""
  },
  {
    name: "Corn & Mayo Salad",
    description: "Sweet corn, mayo, herbs",
    price: 90,
    averagePreparationTime: 7,
    category: "Salad",
    stock: 60,
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-main.jpg",
  },
  {
    name: "Sprout Salad",
    description: "Healthy sprouts, lemon",
    price: 80,
    averagePreparationTime: 6,
    category: "Salad",
    stock: 70,
    image:
      "https://cdn.prod.website-files.com/64931d2aee18510b47f4bb1f/667b1f0128f821612aeb2c35_Sprouted-Moong-Salad-Recipe-Cover-Image.jpg",
  },

  // 🥤 Beverages (6)
  {
    name: "Lemon Iced Tea",
    description: "Refreshing lemon brew",
    price: 60,
    averagePreparationTime: 5,
    category: "Beverage",
    stock: 100,
    image:
      "https://budleaf.com/wp-content/uploads/2023/04/shutterstock_2175082285-1568x1045.jpg",
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with milk",
    price: 80,
    averagePreparationTime: 6,
    category: "Beverage",
    stock: 80,
    image:
      "https://media.assettype.com/freepressjournal/2023-01/b35364ef-cc4a-4401-93b1-4fa180b19e3c/ghnb.jpg",
  },
  {
    name: "Masala Soda",
    description: "Spiced fizzy drink",
    price: 50,
    averagePreparationTime: 4,
    category: "Beverage",
    stock: 90,
    //  image:""
  },
  {
    name: "Mango Shake",
    description: "Thick mango milkshake",
    price: 100,
    averagePreparationTime: 7,
    category: "Beverage",
    stock: 60,
    image:
      "https://media.assettype.com/freepressjournal/2023-01/b35364ef-cc4a-4401-93b1-4fa180b19e3c/ghnb.jpg",
  },
  {
    name: "Strawberry Smoothie",
    description: "Blended strawberries, yogurt",
    price: 110,
    averagePreparationTime: 8,
    category: "Beverage",
    stock: 50,
    image:
      "https://www.thespruceeats.com/thmb/DTkCRqNWiK8HmlAANacYhMLhN9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-breakfast-smoothie-recipe-2097149-hero-02-5c1d4b2a46e0fb00014bf2ec.jpg",
  },
  {
    name: "Sparkling Water",
    description: "500ml mineral water",
    price: 20,
    averagePreparationTime: 1,
    category: "Beverage",
    stock: 200,
    image:
      "https://cdn.shopify.com/s/files/1/0561/7578/8055/files/106_2048x2048.png?v=1727291755",
  },

  // 🍰 Desserts (6)
  {
    name: "Brownie",
    description: "Chocolate fudge brownie",
    price: 90,
    averagePreparationTime: 8,
    category: "Dessert",
    stock: 40,
    image:
      "https://recipesblob.oetker.in/assets/9a89b75f976642dcab8ae407e2f4344e/1272x764/chocolate-brownie.webp",
  },
  {
    name: "Gulab Jamun",
    description: "Traditional Indian sweet",
    price: 70,
    averagePreparationTime: 6,
    category: "Dessert",
    stock: 60,
    image:
      "https://aartimadan.com/wp-content/uploads/2020/11/milk-powder-gulab-jamuns.jpg",
  },
  {
    name: "Ice Cream",
    description: "Vanilla, chocolate, or strawberry",
    price: 60,
    averagePreparationTime: 3,
    category: "Dessert",
    stock: 100,
    image:
      "https://static.toiimg.com/thumb/msid-112315676,width-1280,height-720,resizemode-4/112315676.jpg",
  },
  {
    name: "Rasmalai",
    description: "Soft paneer in sweet milk",
    price: 80,
    averagePreparationTime: 5,
    category: "Dessert",
    stock: 50,
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2014/07/Rasmalai-Recipe-500x500.jpg",
  },
  {
    name: "Chocolate Mousse",
    description: "Rich chocolate cream",
    price: 100,
    averagePreparationTime: 7,
    category: "Dessert",
    stock: 30,
    //  image:""
  },
  {
    name: "Fruit Custard",
    description: "Mixed fruits in vanilla custard",
    price: 85,
    averagePreparationTime: 6,
    category: "Dessert",
    stock: 40,
    //  image:""
  },

  // 🫓 Breads (4)
  {
    name: "Butter Naan",
    description: "Soft Indian bread with butter",
    price: 40,
    averagePreparationTime: 5,
    category: "Bread",
    stock: 100,
    image:
      "https://allwaysdelicious.com/wp-content/uploads/2022/04/garlic-butter-naan-4-1024x682.jpg",
  },

  {
    name: "Garlic Naan",
    description: "Naan topped with garlic",
    price: 50,
    averagePreparationTime: 6,
    category: "Bread",
    stock: 80,
    image:
      "https://andreasnotebook.com/wp-content/uploads/2023/05/best-easy-naan-recipe-1.jpg",
  },
  {
    name: "Chees Naan",
    description: "Naan topped with cheese",
    price: 90,
    averagePreparationTime: 6,
    category: "Bread",
    stock: 80,
    image:
      "https://signatureconcoctions.com/wp-content/uploads/2025/02/Instant-Cottage-Cheese-Naan-5-scaled.jpg",
  },
  {
    name: "Tandoori Roti",
    description: "Whole wheat roti from tandoor",
    price: 30,
    averagePreparationTime: 4,
    category: "Bread",
    stock: 90,
    image: "https://static.toiimg.com/thumb/75542650.cms?width=1200&height=900",
  },
  {
    name: "Lachha Paratha",
    description: "Layered crispy paratha",
    price: 45,
    averagePreparationTime: 7,
    category: "Bread",
    stock: 70,
    //  image:""
  },
];

const seedMenu = async () => {
  try {
    const existingCount = await Menu.countDocuments();
    if (existingCount > 0) {
      return;
    }
    // await Menu.deleteMany({});
    await Menu.insertMany(sampleMenu);
    console.log("Menu seeded successfully");
  } catch (err) {
    console.error("Menu seeding failed:", err);
  }
};

export default seedMenu;
