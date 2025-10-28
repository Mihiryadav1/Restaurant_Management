import mongoose from "mongoose";
import seedMenu from "../seed/seedMenu.js";
import seedChefs from "../seed/seedChef.js";

const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/restaurant")
    .then(async () => {
      await seedMenu();
      await seedChefs();
      console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));
};

export default connectDB;
