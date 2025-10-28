import express from "express";
import connectDB from "./DB/restaurantDB.js";
import { configDotenv } from "dotenv";
import path from "path";
import cron from "node-cron";
import cors from "cors";
import {
  autoCompleteOrders,
  getMenuItems,
  getOrders,
  getOrderSummary,
  getRevenueByRange,
  getTotalRevenue,
  updateOrderStatus,
} from "../Backend/controllers/OrderController.js";
import {
  bookTable,
  createTable,
  deleteTable,
  getAllTables,
} from "./controllers/TableController.js";
import { createOrder } from "./controllers/OrderController.js";
import { getChefs } from "./controllers/ChefController.js";
import { getUsers, userController } from "./controllers/UserController.js";

//Configure Environment variables
configDotenv();

const app = express();
app.use(express.json());

//DB connection
connectDB();
app.use(cors());

//Routes
//Get all Tables
app.get("/api/tables", getAllTables);

//Create Table
app.post("/api/tables", createTable);

//Delete Table
app.delete("/api/tables/:id", deleteTable);

// Book a Table
app.post("/api/tables/book", bookTable);

//Place order
app.post("/api/orders", createOrder, autoCompleteOrders);

//Show Chefs"
app.get("/api/chefs", getChefs);

//Get Orders for Order Line Page UI
app.get("/api/orders", getOrders);

app.get("/api/menu", getMenuItems);

//Get Order Summary
app.get("/api/orders/summary", getOrderSummary);

// Update Order Status
app.patch("/api/orders/:id", updateOrderStatus);

//Total Revenue
app.get("/api/revenue", getTotalRevenue);

app.get("/api/revenueByrange", getRevenueByRange);

// Mobile Apis
app.get("/api/users", getUsers);
app.post("/api/users", userController);

//Server
app.listen(process.env.PORT, (req, res) => {
  console.log("Server running on port 5000");
  res.send("Server is running");
});
