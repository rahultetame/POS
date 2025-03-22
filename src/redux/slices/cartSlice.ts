import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  name: string;
  price: number;
  weight: number;
  measuringUnit: string;
  isSelected: boolean;
  quantity: number;
  sku: string;
  brand: string;
  stock: number;
  description: string;
  category: string;
  image?: string;
  ebt: boolean;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  taxAmount: number;
  ebtSubtotal: number;
  nonEbtSubtotal: number;
  taxableNonEbtSubTotal: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  taxAmount: 0,
  ebtSubtotal: 0,
  nonEbtSubtotal: 0,
  taxableNonEbtSubTotal: 0,
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

      // Recalculate totals
      state.ebtSubtotal = state.items
        .filter((item) => item.ebt)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      state.nonEbtSubtotal = state.items
        .filter((item) => !item.ebt)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      state.taxAmount = state.nonEbtSubtotal * 0.07;
      state.taxableNonEbtSubTotal = state.nonEbtSubtotal + state.taxAmount;
      state.totalAmount =
        state.ebtSubtotal + state.nonEbtSubtotal + state.taxAmount;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.sku !== action.payload);

      // Recalculate totals
      state.ebtSubtotal = state.items
        .filter((item) => item.ebt)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      state.nonEbtSubtotal = state.items
        .filter((item) => !item.ebt)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      state.taxAmount = state.nonEbtSubtotal * 0.07;
      state.taxableNonEbtSubTotal = state.nonEbtSubtotal + state.taxAmount;
      state.totalAmount =
        state.ebtSubtotal + state.nonEbtSubtotal + state.taxAmount;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ sku: string; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.sku === action.payload.sku
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }

      // Recalculate totals
      state.ebtSubtotal = state.items
        .filter((item) => item.ebt)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      state.nonEbtSubtotal = state.items
        .filter((item) => !item.ebt)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      state.taxAmount = state.nonEbtSubtotal * 0.07;
      state.taxableNonEbtSubTotal = state.nonEbtSubtotal + state.taxAmount;
      state.totalAmount =
        state.ebtSubtotal + state.nonEbtSubtotal + state.taxAmount;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.taxAmount = 0;
      state.ebtSubtotal = 0;
      state.nonEbtSubtotal = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
