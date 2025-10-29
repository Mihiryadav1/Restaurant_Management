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
    //  image:""
  },
  {
    name: "Marinara",
    description: "Tomato, garlic, oregano",
    price: 200,
    averagePreparationTime: 12,
    category: "Pizza",
    stock: 60,
    //  image:""
  },
  {
    name: "Pepperoni",
    description: "Spicy pepperoni, mozzarella",
    price: 300,
    averagePreparationTime: 20,
    category: "Pizza",
    stock: 30,
    //  image:""
  },
  {
    name: "Farmhouse",
    description: "Bell peppers, onions, mushrooms",
    price: 220,
    averagePreparationTime: 16,
    category: "Pizza",
    stock: 45,
    //  image:""
  },
  {
    name: "Mexican Green Wave",
    description: "Jalapeños, capsicum, spicy sauce",
    price: 240,
    averagePreparationTime: 17,
    category: "Pizza",
    stock: 35,
    //  image:""
  },
  {
    name: "Cheese Burst",
    description: "Extra cheese overload",
    price: 260,
    averagePreparationTime: 14,
    category: "Pizza",
    stock: 50,
    //  image:""
  },
  {
    name: "Tandoori Paneer",
    description: "Paneer tikka, onions, mint",
    price: 280,
    averagePreparationTime: 18,
    category: "Pizza",
    stock: 40,
    //  image:""
  },

  // 🍔 Burgers (6)
  {
    name: "Classic Veg Burger",
    description: "Lettuce, tomato, cheese",
    price: 120,
    averagePreparationTime: 10,
    category: "Burger",
    stock: 40,
    //  image:""
  },
  {
    name: "Paneer Melt Burger",
    description: "Grilled paneer, spicy mayo",
    price: 150,
    averagePreparationTime: 12,
    category: "Burger",
    stock: 35,
    //  image:""
  },
  {
    name: "Volcano Burger",
    description: "Volcano Cheese, spicy mayo",
    price: 150,
    averagePreparationTime: 12,
    category: "Burger",
    stock: 35,
    //  image:""
  },
  {
    name: "Chicken BBQ Burger",
    description: "BBQ chicken, onions, cheddar",
    price: 180,
    averagePreparationTime: 15,
    category: "Burger",
    stock: 30,
    //  image:""
  },
  {
    name: "Double Patty Burger",
    description: "Two patties, cheese, lettuce",
    price: 200,
    averagePreparationTime: 16,
    category: "Burger",
    stock: 25,
    //  image:""
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
    //  image:""
  },
  {
    name: "Arrabbiata Pasta",
    description: "Spicy tomato sauce, garlic",
    price: 150,
    averagePreparationTime: 12,
    category: "Pasta",
    stock: 45,
    //  image:""
  },
  {
    name: "Pesto Pasta",
    description: "Basil pesto, parmesan",
    price: 170,
    averagePreparationTime: 13,
    category: "Pasta",
    stock: 35,
    //  image:""
  },
  {
    name: "Mac & Cheese",
    description: "Cheesy elbow pasta",
    price: 140,
    averagePreparationTime: 11,
    category: "Pasta",
    stock: 50,
    //  image:""
  },
  {
    name: "Lasagna",
    description: "Layered pasta with meat/veg",
    price: 200,
    averagePreparationTime: 20,
    category: "Pasta",
    stock: 30,
    //  image:""
  },
  {
    name: "Spaghetti Bolognese",
    description: "Minced meat tomato sauce",
    price: 190,
    averagePreparationTime: 18,
    category: "Pasta",
    stock: 25,
    //  image:""
  },

  // 🥗 Salads (4)
  {
    name: "Greek Salad",
    description: "Feta, olives, cucumber",
    price: 100,
    averagePreparationTime: 8,
    category: "Salad",
    stock: 50,
    //  image:""
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
    //  image:""
  },
  {
    name: "Sprout Salad",
    description: "Healthy sprouts, lemon",
    price: 80,
    averagePreparationTime: 6,
    category: "Salad",
    stock: 70,
    //  image:""
  },

  // 🥤 Beverages (6)
  {
    name: "Lemon Iced Tea",
    description: "Refreshing lemon brew",
    price: 60,
    averagePreparationTime: 5,
    category: "Beverage",
    stock: 100,
    //  image:"",
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with milk",
    price: 80,
    averagePreparationTime: 6,
    category: "Beverage",
    stock: 80,
    //  image:""
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
    //  image:""
  },
  {
    name: "Strawberry Smoothie",
    description: "Blended strawberries, yogurt",
    price: 110,
    averagePreparationTime: 8,
    category: "Beverage",
    stock: 50,
    //  image:""
  },
  {
    name: "Water Bottle",
    description: "500ml mineral water",
    price: 20,
    averagePreparationTime: 1,
    category: "Beverage",
    stock: 200,
    //  image:"",
  },

  // 🍰 Desserts (6)
  {
    name: "Brownie",
    description: "Chocolate fudge brownie",
    price: 90,
    averagePreparationTime: 8,
    category: "Dessert",
    stock: 40,
    //  image:""
  },
  {
    name: "Gulab Jamun",
    description: "Traditional Indian sweet",
    price: 70,
    averagePreparationTime: 6,
    category: "Dessert",
    stock: 60,
    //  image:""
  },
  {
    name: "Ice Cream",
    description: "Vanilla, chocolate, or strawberry",
    price: 60,
    averagePreparationTime: 3,
    category: "Dessert",
    stock: 100,
    //  image:"",
  },
  {
    name: "Rasmalai",
    description: "Soft paneer in sweet milk",
    price: 80,
    averagePreparationTime: 5,
    category: "Dessert",
    stock: 50,
    //  image:""
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
    //  image:"",
  },

  {
    name: "Garlic Naan",
    description: "Naan topped with garlic",
    price: 50,
    averagePreparationTime: 6,
    category: "Bread",
    stock: 80,
    //  image:""
  },
  {
    name: "Chees Naan",
    description: "Naan topped with cheese",
    price: 90,
    averagePreparationTime: 6,
    category: "Bread",
    stock: 80,
    //  image:""
  },
  {
    name: "Tandoori Roti",
    description: "Whole wheat roti from tandoor",
    price: 30,
    averagePreparationTime: 4,
    category: "Bread",
    stock: 90,
    //  image:""
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
