import Menu from "../models/Menu.js";
import Order from "../models/Orders.js";
import Chef from "../models/Chef.js";
import Table from "../models/Table.js";

//Create Order
export const createOrder = async (req, res) => {
  const {
    orderId,
    type,
    tableNumber,
    address,
    name,
    phone,
    items,
    cookingInstructions,
  } = req.body;

  try {
    // Validate required fields
    if (!orderId || !type || !name || !phone || !items) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (type === "dine-in" && !tableNumber) {
      return res
        .status(400)
        .json({ message: "Table number is required for dine-in orders" });
    }
    if (type === "takeaway" && !address) {
      return res
        .status(400)
        .json({ message: "Address is required for takeaway orders" });
    }

    // Check for duplicate orderId
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(409).json({ message: "Order ID already exists" });
    }
    let totalPreparationTime = 0;
    let totalQuantity = 0;
    let totalPrice = 0;
    const enrichedItems = [];
    for (const item of items) {
      const menuItem = await Menu.findById(item.itemId);
      if (!menuItem) {
        return res
          .status(404)
          .json({ message: `Menu item with ID ${item.itemId} not found` });
      }
      //
      // Total Preparation Time Calculation
      totalPreparationTime += menuItem.averagePreparationTime * item.quantity;
      totalQuantity += item.quantity;
      totalPrice += menuItem.price * item.quantity;
      enrichedItems.push({
        itemId: item.itemId,
        quantity: item.quantity,
        totalItemPrice: menuItem.price * item.quantity,
      });
    }
    const processingEndsAt = new Date(
      Date.now() + totalPreparationTime * 60000
    );

    //Assign Chef with least currentOrders
    const chef = await Chef.find();

    if (!chef.length) {
      return res.status(404).json({ message: "No chefs available" });
    }

    const minOrdersChef = Math.min(...chef.map((c) => c.currentOrders));

    const eligibleChefs = chef.filter((c) => c.currentOrders === minOrdersChef);

    const assignedChef =
      eligibleChefs[Math.floor(Math.random() * eligibleChefs.length)];
    assignedChef.currentOrders += 1;
    await assignedChef.save();

    // Create new order
    const newOrder = new Order({
      orderId,
      type,
      tableNumber,
      address,
      chefId: assignedChef._id,
      client: { name, phone, address },
      items: enrichedItems,
      totalQuantity,
      totalPrice,
      cookingInstructions,
      processingEndsAt,
      status: "processing",
      createdAt: new Date(),
    });
    await newOrder.save();
    if (type === "dine-in" && tableNumber) {
      await Table.updateOne(
        { number: tableNumber },
        { $set: { reserved: true } }
      );
    }
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update Order Status
export const autoCompleteOrders = async () => {
  const now = new Date();
  const orders = await Order.find({
    status: "processing",
    processingEndsAt: { $lte: now },
  });

  for (const order of orders) {
    await Order.findByIdAndUpdate(order._id, { status: "done" });
  }
};

// Get All Placed Orders
export const getOrders = async (req, res) => {
  const query = {};
  const { status, type } = req.query;

  if (status) {
    query.status = status;
  }
  if (type) {
    query.type = type;
  }
  try {
    const orders = await Order.find(query).sort({ processingEndsAt: 1 });
    res.status(200).json({ orders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Get Menu Items for menu display
export const getMenuItems = async (req, res) => {
  const { category, search, limit = 6, offSet } = req.query;

  const query = {};
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: "i" };

  try {
    const items = await Menu.find(query)
      .skip(Number(offSet))
      .limit(Number(limit));
    const total = await Menu.countDocuments(query);
    res.status(200).json({
      message: "Menu Fetched Successfully",
      hasMore: Number(offSet) + items.length < total,
      items,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch menu", error: err.message });
  }
};

//Get order summary
export const getOrderSummary = async (req, res) => {
  const { range = "daily" } = req.query;
  const now = new Date();
  let start;

  if (range === "weekly") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  } else if (range === "monthly") {
    start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  try {
    const orders = await Order.find({ createdAt: { $gte: start } });

    //Orders done
    const ordersDone = orders.filter((item) => item.status === "done");
    // orders still processing
    const processingOrders = orders.filter(
      (item) => item.status === "processing"
    );
    // Length calculations
    const served = ordersDone.length;
    const processOrderLength = processingOrders.length;

    // Type calculations
    const dineIn = ordersDone.filter((o) => o.type === "dine-in").length;
    const takeAway = ordersDone.filter((o) => o.type === "takeaway").length;

    // Percentage calculations
    const servedPct = 100;
    const dineInPct = served ? Math.round((dineIn / served) * 100) : 0;
    const takeAwayPct = served ? Math.round((takeAway / served) * 100) : 0;

    res.status(200).json({
      served,
      dineIn,
      takeAway,
      processOrderLength,
      percentages: {
        served: servedPct,
        dineIn: dineInPct,
        takeAway: takeAwayPct,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch summary", error: err.message });
  }
};
//Get Total Revenue
export const getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: "done" });
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    res.status(200).json({ totalRevenue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to calculate revenue", error: err.message });
  }
};

//Update Order Status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (status === "done" && updated.chefId) {
      const chef = await Chef.findById(updated.chefId);
      if (chef) {
        chef.currentOrders = Math.max(chef.currentOrders - 1, 0);
        await chef.save();
        console.log(
          `✅ Chef ${chef.name} updated for order ${updated.orderId}`
        );
      }
    }
    res.status(200).json({ message: "Order status updated", order: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: err.message });
  }
};

//Revenus Stats
export const getRevenueByRange = async (req, res) => {
  const { range = "daily" } = req.query;
  const now = new Date();
  let start;

  // Define start date based on range
  if (range === "weekly") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28); // last 4 weeks
  } else if (range === "monthly") {
    start = new Date(now.getFullYear(), now.getMonth() - 6, 1); // last 6 months
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7); // last 7 days
  }

  try {
    const orders = await Order.find({
      createdAt: { $gte: start, $lte: now },
      status: "done",
    });

    const grouped = {};

    orders.forEach((order) => {
      let label;

      if (range === "monthly") {
        label = order.createdAt.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      } else if (range === "weekly") {
        const weekStart = new Date(order.createdAt);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // start of week (Sunday)
        label = `Week of ${weekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`;
      } else {
        label = order.createdAt.toLocaleDateString("en-US", {
          weekday: "short",
        });
      }

      grouped[label] = (grouped[label] || 0) + order.totalPrice;
    });

    const revenueByRange = Object.entries(grouped).map(([label, amount]) => ({
      label,
      amount,
    }));

    res.status(200).json({ revenueByRange });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch revenue", error: err.message });
  }
};
