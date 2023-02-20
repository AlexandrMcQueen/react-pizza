import React from 'react';
import './Pagination.scss'


type PaginationPageProps = {
    postsPerPage: number,
    currentPosts: number,
    setCurrentPage: any,
}
export const PaginationPage : React.FC<PaginationPageProps> = ({postsPerPage,currentPosts,setCurrentPage}) => {
    const pages = [];
    for (let i = 1;i<=Math.ceil(currentPosts/postsPerPage);i++){
        pages.push(i);
    }
    return (
        <div className='btnWrapper'>
                {pages.map((page,index) => (
                    <button key={index} className= 'btn-pagination' onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}

        </div>
    );
};

