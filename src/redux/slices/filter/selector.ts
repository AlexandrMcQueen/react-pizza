import {RootState} from "../../store";

export const selectSortItem = (state : RootState) => state.filter.sort;
export const selectorFilter = (state : RootState) => state.filter;
export const selectorSort  = (state : RootState) => state.filter.search;
export const selectCategoryId = (state : RootState) => state.filter.categoryId;