import { CartStore } from "@/types/types";
import { cartSchema } from "@/types/zodTypes";
import { create } from "zustand";

export const useCart = create<CartStore>((set) => ({
  cartInfo: cartSchema.parse({ cartItems: [] }),
  setCartInfo: (updatedCartInfo) => set({ cartInfo: updatedCartInfo }),
}));
