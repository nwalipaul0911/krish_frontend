import { createSlice } from "@reduxjs/toolkit";
import { useCallback } from "react";

const initialStateValue = {
  value: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateValue,
  reducers: {
    // reducer for updating each item
    modifyCart: (state, action) => {
      const modifiedItem = action.payload;
      const index = state.value.findIndex(
        (item) => item.id === modifiedItem.id
      );
      if (index !== -1) {
        state.value[index] = modifiedItem;
      }
      else{
        state.value = [...state.value, action.payload]
      }
    },
    // reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => item.id != action.payload.id);
    },
    // reducer to clear the cart
    clearCart: (state) => {
      state.value = [];
    },
  },
});
export const { modifyCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
