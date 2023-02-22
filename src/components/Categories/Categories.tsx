import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../../redux/slices/filter/slice";
import {selectCategoryId} from '../../redux/slices/filter/selector'


const categories = ['Всі',"М'ясні",'Вегетаріанська','Гриль','Гострі','Закриті'];
    
export const Categories : React.FC = React.memo( () => {
    const categoryId = useSelector(selectCategoryId);
    const dispatch = useDispatch();

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
});

