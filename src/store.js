import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/add-cart/addCartSlice';
import productReducer from './slice/products/productSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
  },
});


export default store;
