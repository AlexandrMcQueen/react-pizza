import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, selectCartItemById} from "../redux/slices/cartSlice";
import {Link} from "react-router-dom";

interface Ipizza {
    imageUrl?: string,
    sizes?: number[],
    types?: number[],
    title?: string,
    description?: string,
    price?: number,

}
const PizzaFull: React.FC = () => {

    const [pizza,setPizza] = useState<Ipizza>();
    const [activeType,setActiveType] = useState<number>(0);
    const [sizeActive,setSizeActive] = useState<number>(0);
    const typeNames : string[] = ['тонке',"традиційне"];
    const activeSizeValue : string[] = ['26','30','40'];

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://63c087ec99c0a15d28d7bb41.mockapi.io/pizzas/' + id);
                setPizza(data);
            } catch (err){
                navigate('/react-pizza');
                alert('sorry,but something went wrong')
                console.warn(err);
            }
        }
        fetchPizza();
    },[])


    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById);


    const onClickAdd = () => {
        dispatch(addProduct( {count:0,...pizza,id,type:typeNames[activeType],size:activeSizeValue[sizeActive]}))
    }

    if (!pizza) {
        return <h3 style={{textAlign:"center"}}>loading...</h3>

    }

    const renderPizzaTypes = () => {
        if (!pizza.types) {
            return false;
        }
        return (
            <ul>
                {pizza.types.map((item: number, index: number) => {
                    return (
                        <li
                            key={index}
                            className={activeType === index ? 'active' : ''}
                            onClick={() => setActiveType(index)}
                        >
                            {typeNames[item]}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderPizzaSizes = () => {
        if (!pizza.sizes) {
            return false;
        }
        return (
            <ul>
                {pizza.sizes.map((item: number, index: number) => {
                    return (
                        <li
                            key={index}
                            onClick={() => setSizeActive(index)}
                            className={index === sizeActive ? 'active' : ''}
                        >
                            {item} см.
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderedTypes = renderPizzaTypes();
    const renderedSizes = renderPizzaSizes();

    return (
        <div key={id} className="pizza-block__full" >
               <div className='pizza-block'>

                    <img
                        className="pizza-block__image"
                        src= {pizza.imageUrl}
                        alt= 'Pizza'
                    />

                <h4 className="pizza-block__title">{pizza.title}</h4>

                <div className="pizza-block__selector">
                    {renderedTypes}
                    {renderedSizes}
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">від {pizza.price} грн. </div>
                </div>
            </div>

                <div className='pizza__description'>
                    <h3 className="desc__title">Піца {pizza.title}</h3>
                    <p>{pizza.description}</p>
                   <div className='btn_container'>
                       <Link to="/react-pizza" className="button button--black">
                           <span>Повернутись назад</span>
                       </Link>
                       <button onClick={onClickAdd} className="button button--outline button--add ">
                           <svg
                               width="12"
                               height="12"
                               viewBox="0 0 12 12"
                               fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                           >
                               <path
                                   d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                   fill="white"
                               />
                           </svg>
                           <span>Додати</span>
                       </button>
                   </div>

                </div>
        </div>
    );
};

export default PizzaFull;