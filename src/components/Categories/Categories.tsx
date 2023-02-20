import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCategoryId, setCategoryId} from "../../redux/slices/filterSlice";

export const Categories : React.FC = () => {
    const categoryId = useSelector(selectCategoryId);
    const dispatch = useDispatch();
    const categories = ['Всі',"М'ясні",'Вегетаріанська','Гриль','Гострі','Закриті'];

    const onClickCategory = (id : number) : void => {
        dispatch(setCategoryId(id))
    }
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName,index) => (

                        <li
                            key={index}
                            onClick={() => onClickCategory(index) }
                            className={categoryId === index ? 'active' : ''}
                        >
                            {categoryName}
                        </li>


                ) )}
            </ul>
        </div>

    );
};

