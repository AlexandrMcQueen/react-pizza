import React from 'react';
import './Pagination.scss'
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../redux/slices/filter/slice";


type PaginationPageProps = {
    postsPerPage: number,
    currentPosts: number,
}
export const PaginationPage : React.FC<PaginationPageProps> = ({postsPerPage,currentPosts}) => {
    const pages = [];
    for (let i = 1;i<=Math.ceil(currentPosts/postsPerPage);i++){
        pages.push(i);
    }
    const dispatch = useDispatch();

    return (
        <div className='btnWrapper'>
                {pages.map((page,index) => (
                    <button key={index} className= 'btn-pagination' onClick={() => dispatch(setCurrentPage(page))}>
                        {page}
                    </button>
                ))}

        </div>
    );
};

