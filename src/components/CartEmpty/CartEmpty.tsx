import React from 'react';
import {Link} from "react-router-dom";
import emptyCard from '../../assets/img/empty-cart.png'

export const CartEmpty : React.FC = () => {

    return (
            <div className="content">
                <div className="container container--cart">
                    <div className="cart cart--empty">
                        <h2>Корзина порожня
                            <span>😕</span>
                        </h2>
                        <p>
                            Можливо ви ще не замовляли піцу.<br/>
                            Для того, щоб замовити піцу,перейдіть на головну сторінку.
                        </p>
                        <img src={emptyCard} alt="Empty cart"/>
                        <Link to="/react-pizza" className="button button--black">
                            <span>Повернутись назад</span>
                        </Link>
                    </div>
                </div>
            </div>


    );
};

