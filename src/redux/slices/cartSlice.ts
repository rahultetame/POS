import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  name: string;
  price: number;
  weight: number;
  measuringUnit: string;
  quantity: number;
  sku: string;
  brand: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload
      );
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.sku !== action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ sku: string; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku
      );
      if (existingItem) {
        state.totalAmount +=
          (action.payload.quantity - existingItem.quantity) *
          existingItem.price;
        existingItem.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
