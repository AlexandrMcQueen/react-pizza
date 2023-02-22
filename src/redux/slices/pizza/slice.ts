import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {itemsState, pizzaInitialState, PizzaStatus} from "./types";
import {fetchPizzas} from "./asyncAction";

const initialState : pizzaInitialState = {
    items: [],
    status: PizzaStatus.LOADING,
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state,action) {
            state.items = action.payload;
        },
    },


    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending,(state) => {
            state.status = PizzaStatus.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled,(state,action : PayloadAction<itemsState[]>) => {
            state.items = action.payload;
            state.status = PizzaStatus.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected,(state) => {
            state.status = PizzaStatus.ERROR;
            state.items = [];
        });

    }

})
export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;