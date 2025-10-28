import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberOfPersons: { type: Number, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
