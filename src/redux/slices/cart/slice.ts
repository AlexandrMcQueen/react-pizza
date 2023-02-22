import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLS} from "utils/getCartFromLS";
import {calcTotalPrice} from 'utils/calcTotalPrice'
import {CartItem, CartSliceState} from "./types";


const {items,totalPrice} = getCartFromLS();

const initialState : CartSliceState = {
    totalPrice,
    items,
}

const cartSlices = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state,action : PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if (findItem){
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count : 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items);


        },
        removeProduct(state,action : PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum;
            },0)
        },
        clearProducts(state) {
            state.totalPrice = 0;
            state.items = [];
        },
        plusItem(state,action : PayloadAction<string>) {
            let plus = state.items.find((obj) => obj.id === action.payload);
            if (plus) {
                plus.count++;
            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum;
            },0)
        },
        minusItem(state,action : PayloadAction<string>) {
            let minus = state.items.find((obj) => obj.id === action.payload);
            if (minus) {
                minus.count--;

            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum;
            },0)
        },
    }
})

export const { addProduct,removeProduct,clearProducts,minusItem,plusItem } = cartSlices.actions;

export default cartSlices.reducer;