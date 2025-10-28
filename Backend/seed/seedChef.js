import mongoose from "mongoose";
import Chef from "../models/Chef.js"; // adjust path if needed

const sampleChefs = [
  { name: "Chef Arjun", currentOrderCount: 0 },
  { name: "Chef Meera", currentOrderCount: 0 },
  { name: "Chef Kabir", currentOrderCount: 0 },
  { name: "Chef Anaya", currentOrderCount: 0 },
];

const seedChefs = async () => {
  try {
    await Chef.deleteMany({});
    await Chef.insertMany(sampleChefs);
    console.log("Chefs seeded successfully");
  } catch (err) {
    console.error("Chef seeding failed:", err);
  }
};

export default seedChefs;
