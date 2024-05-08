// store.js
import {create} from 'zustand';

const useCartStore = create((set) => ({
  totalQuantity: 0,
  setTotalQuantity: (quantity) => set({ totalQuantity: quantity }),
}));

export default useCartStore;
