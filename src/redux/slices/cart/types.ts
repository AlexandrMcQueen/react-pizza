export type CartItem = {
    id: string,
    title: string,
    imageUrl : string,
    price: number,
    type: string,
    size: string,
    count: number,
}
export interface CartSliceState {
    totalPrice: number,
    items: CartItem[],
}