import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  number: {
    // Unique table number
    type: Number,
    required: true,
  },
  size: {
    // Number of seats at the table
    type: Number,
    enum: [2, 4, 6, 8],
    required: true,
  },
  reserved: {
    // Reservation status
    type: Boolean,
    default: false,
  },
  name: {
    // Optional name for the table
    type: String,
    default: "Table",
  },
});

export default mongoose.model("Table", TableSchema);
