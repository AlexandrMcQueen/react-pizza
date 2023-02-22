import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchPizzas, itemsState} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params : FetchPizzas ) => {
        const {isDeskPropertyPositive, searchValueBase, sortTypeReplace,categoryId, currentPage} = params;
        const {data} = await axios.get<itemsState[]>(`https://63c087ec99c0a15d28d7bb41.mockapi.io/pizzas?page=${currentPage}&category=${categoryId > 0 ? categoryId : '' }` + '&sortBy=' + sortTypeReplace + `&order=${isDeskPropertyPositive}` + searchValueBase);

        return data;
    }
)