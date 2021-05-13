import { createSlice } from "@reduxjs/toolkit";

import { CartProps } from "../@types/CartTypes";

const initialState: CartProps = {
  games: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add remove?
    addItemToCart(state, action) {
      const newGame = action.payload;
      state.games.push(newGame);
      state.totalPrice = state.totalPrice + newGame.price;
    },
  },
});

export const CartActions = cartSlice.actions;
