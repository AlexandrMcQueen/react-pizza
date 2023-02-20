import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {isDeskPropertyPositive, searchValueBase, sortTypeReplace,categoryId, currentPage} = params;
        const {data} = await axios.get(`https://63c087ec99c0a15d28d7bb41.mockapi.io/pizzas?page=${currentPage}&category=${categoryId > 0 ? categoryId : '' }` + '&sortBy=' + sortTypeReplace + `&order=${isDeskPropertyPositive}` + searchValueBase);

       return data;
    }
)


const initialState = {
    items: [],
    status: '',
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state,action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending] : (state,action) => {
            state.status = 'loading';
            state.items = [];

        },
        [fetchPizzas.fulfilled] : (state,action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected] : (state,action) => {
            state.status = 'error';
            state.items = [];

        }

    }
})
export const selectorPizza = (state) => state.pizza;
export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;