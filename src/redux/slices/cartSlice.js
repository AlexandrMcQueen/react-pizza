import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlices = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state,action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

                if (findItem){
                    findItem.count++;
                } else {
                    state.items.push({
                        ...action.payload,
                        count : 1
                    })
                }

            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum;
            },0)


        },
        removeProduct(state,action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum;
            },0)
        },
        clearProducts(state) {
            state.totalPrice = 0;   
            state.items = [];
        },
        plusItem(state,action) {
            let plus = state.items.find((obj) => obj.id === action.payload);
            if (plus) {
                plus.count++;
            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return obj.price * obj.count + sum;
            },0)
        },
        minusItem(state,action) {
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

export const cartSelector = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemById =(id) => (state) => state.cart.items.find((obj) => obj.id === id);
export const { addProduct,removeProduct,clearProducts,minusItem,plusItem } = cartSlices.actions;

export default cartSlices.reducer;