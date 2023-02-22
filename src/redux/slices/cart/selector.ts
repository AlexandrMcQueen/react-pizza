import {RootState} from "../../store";

export const cartSelector = (state : RootState) => state.cart;
export const selectCartItems = (state : RootState) => state.cart.items;
export const selectCartItemById =(id: string) => (state : RootState) => state.cart.items.find((obj) => obj.id === id);