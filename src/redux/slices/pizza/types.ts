export interface itemsState {
    id: string,
    title: string,
    imageUrl : string,
    price: number,
    type: number,
    size: number,
    count: number,

}
export interface pizzaInitialState {
    items: itemsState[];
    status: PizzaStatus;
}


export type FetchPizzas = {
    isDeskPropertyPositive : string;
    searchValueBase : string;
    sortTypeReplace : string;
    categoryId : number;
    currentPage : number;
}

export enum PizzaStatus {
    LOADING =  'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}