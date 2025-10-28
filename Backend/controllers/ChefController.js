import Chef from "../models/Chef.js";

export const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

 