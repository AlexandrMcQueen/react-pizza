export interface filterSliceState {
    categoryId : number,
    sort : sortType,
    search : string;
    currentPage : number

}
export type SortPropertyType = 'rating' | 'price' | 'title'| '-rating' | '-price' | '-title';

export type sortType = {
    name: string;
    sortProperty: SortPropertyType;
}