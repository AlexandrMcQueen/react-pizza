import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {filterSliceState, sortType} from "./types";


const initialState : filterSliceState = {
    categoryId: 0,
    sort: {
        name: 'популярності',
        sortProperty: 'rating'
    },
    search: '',
    currentPage: 1,
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state,action : PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortType(state,action : PayloadAction<sortType>) {
            state.sort = action.payload;
        },
        setSearchValue(state,action : PayloadAction<string>) {
            state.search = action.payload;
        },
        setCurrentPage(state,action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state,action){
            state.categoryId = action.payload.categoryId;
            state.currentPage = action.payload.currentPage;
            state.sort = action.payload.sort;

        },



    }
})

export const {setCategoryId,setSortType,setSearchValue,setCurrentPage,setFilters} = filterSlice.actions;

export default filterSlice.reducer;