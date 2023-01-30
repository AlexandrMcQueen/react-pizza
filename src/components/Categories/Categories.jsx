import React, {useState} from 'react';

export const Categories = () => {

    const [activeClass,setActiveClass] = useState(0);


    const categories = ['Всі',"М'ясні",'Вегетаріанська','Гриль','Гострі','Закриті'];

    return (
        <div className="categories">
            <ul>
                {categories.map((item,index) => (

                        <li
                            key={index}
                            onClick={() => setActiveClass(index)}
                            className={activeClass === index ? 'active' : ''}
                        >
                            {item}
                        </li>


                ) )}
            </ul>
        </div>

    );
};

