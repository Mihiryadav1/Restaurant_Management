import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.find((i) => i.item === item.itemId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({
          ...item,
          quantity: 1,
        });
      }
    },
    increment: (state, action) => {
      const item = state.find((i) => i.itemId === action.payload);
      if (item) item.quantity += 1;
    },
    decrement: (state, action) => {
      const itemIndex = state.findIndex((i) => i.itemId === action.payload);
      if (itemIndex !== -1) {
        if (state[itemIndex].quantity > 1) {
          state[itemIndex].quantity -= 1;
        } else {
          state.splice(itemIndex, 1); // Remove item when quantity hits 0
        }
      }
    },
    removeItem: (state, action) => {
      return state.filter((i) => i.itemId !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addItem, increment, decrement, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
