// controllers/userController.js
import User from "../models/Users.js";

export const userController = async (req, res) => {
  try {
    //Remove unncecessary characters from contact
    const normalizedContact = req.body.contact.replace(/\D/g, "");
    const numberOfChairs = Number(req.body.numberOfPersons);
    //Check if user exists already
    const existingUser = await User.findOne({
      contact: normalizedContact,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this contact already exists",
      });
    }

    const user = new User({
      ...req.body,
      numberOfPersons: numberOfChairs,
      contact: normalizedContact,
    });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
