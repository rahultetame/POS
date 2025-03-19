import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productListData } from '../../data';

interface Product {
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
}

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: productListData,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
