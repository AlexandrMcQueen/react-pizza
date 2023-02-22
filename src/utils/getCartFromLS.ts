import {calcTotalPrice} from "./calcTotalPrice";

export const getCartFromLS = () : any => {
    const data = localStorage.getItem('cartItems');
    const items =  data ? JSON.parse(data) : [ ];
    const totalPrice = calcTotalPrice(items);
    if (items){
       return {
           items,
           totalPrice,

       }
    }
}