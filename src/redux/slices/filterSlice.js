import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярності',
        sortProperty: 'rating'
    },
    search: '',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state,action) {
            state.categoryId = action.payload;
        },
        setSortType(state,action) {
            state.sort = action.payload;
        },
        setSearchValue(state,action) {
            state.search = action.payload;
        },

      

    }
})

export const selectSortItem = (state => state.filter.sort);
export const selectorFilter = (state) => state.filter;
export const selectorSort  = (state) => state.filter.search;
export const selectCategoryId = (state => state.filter.categoryId);
export const {setCategoryId,setSortType,setSearchValue,setFilters} = filterSlice.actions;

export default filterSlice.reducer;