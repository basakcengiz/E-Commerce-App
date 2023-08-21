import { createSlice } from "@reduxjs/toolkit";

const favsCartSlice = createSlice({
  name: "favsCart",
  initialState: {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    favsItems: [],
    favsTotalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        state.cartTotalQuantity += 1;
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        state.cartTotalQuantity += 1;
      }
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const filteredCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = filteredCartItems;
      }
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const filteredCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );
          state.cartItems = filteredCartItems;
        }
      });
    },
    clearCart(state) {
      state.cartItems = [];
    },
    getTotals(state) {
      let total = 0;
      let quantity = 0;
      state.cartItems.forEach((item) => {
        total += item.cartQuantity * item.price;
        quantity += item.cartQuantity;
      });
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    handleFavs(state, action) {
      const itemIndex = state.favsItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.favsItems = state.favsItems.filter((item) => {
          return item.id !== action.payload.id;
        });
        state.favsTotalQuantity -= 1;
      } else {
        state.favsItems.push(action.payload);
        state.favsTotalQuantity += 1;
      }
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
  getTotals,
  handleFavs,
} = favsCartSlice.actions;

export const favsCartReducer = favsCartSlice.reducer;
