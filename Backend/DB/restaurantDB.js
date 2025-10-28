import mongoose from "mongoose";
import seedMenu from "../seed/seedMenu.js";
import seedChefs from "../seed/seedChef.js";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
      console.log('Connection Successfull!')
      await seedMenu();
      await seedChefs();
      console.log("Data Seeded Successfully");
    })
    .catch((err) => console.log(err));
};

export default connectDB;
