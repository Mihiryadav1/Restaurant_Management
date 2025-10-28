import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["dine-in", "takeaway"],
    required: true,
  },
  address: {
    type: String,
    required: function () {
      return this.type === "takeaway";
    },
  },
  tableNumber: {
    type: Number,
    required: function () {
      return this.type === "dine-in";
    },
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef",
  },
  client: {
    name: String,
    phone: String,
    address: String,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalQuantity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
    required: true,
  },

  processingEndsAt: {
    type: Date,
    required: true,
  },

  cookingInstructions: String,
  status: {
    type: String,
    enum: ["processing", "done"],
    default: "processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
