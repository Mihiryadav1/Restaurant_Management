import Table from "../models/Table.js";

// Get All Tables
export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find({}).sort({ number: 1 });
    return res.json({
      message: "Tables fetched successfully",
      tables,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tables" });
  }
};

//create Table
export const createTable = async (req, res) => {
  const count = await Table.countDocuments();
  if (count >= 30) {
    return res.status(400).json({ error: "Maximum table limit reached" });
  }

  //get table details from request body
  const { size, name } = req.body;

  // create new table
  const newTable = new Table({
    number: count + 1,
    size,
    name: name || "",
    reserved: false,
  });

  await newTable.save();
  res.status(201).json({
    message: "Table created successfully",
    newTable,
  });
};

//Delete Table
export const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    // check if table is reserved
    const table = await Table.findById(id);
    if (table.reserved) {
      return res.status(400).json({ error: "Cannot delete a reserved table" });
    }
    // delete table
    const deletedTable = await Table.findByIdAndDelete(id);
    if (!deleteTable) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.json({ message: "Table deleted successfully", deletedTable });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete table" });
  }
};

// Table Booking
export const bookTable = async (req, res) => {
  const persons = Number(req.body.persons);
  const { name } = req.body;
  try {
    if (typeof persons !== "number" || persons <= 0) {
      return res.status(400).json({
        error: "Invalid number of persons",
      });
    }

    // Find available table
    const unreservedTables = await Table.find({
      reserved: false,
    });

    const suitableTables = unreservedTables
      .filter((table) => table.size >= persons)
      .sort((a, b) => a.size - b.size || a.number - b.number);

    const tableToBook = suitableTables[0];
    if (!tableToBook) {
      return res.status(404).json({ error: "No suitable table available" });
    }
    // Book the table
    tableToBook.reserved = true;
    tableToBook.name = name || "";
    await tableToBook.save();
    return res.json({
      message: "Table booked successfully",
      tableToBook,
    });  
  } catch (err) {
    return res.status(500).json({ error: "Failed to book table" });
  }
};
