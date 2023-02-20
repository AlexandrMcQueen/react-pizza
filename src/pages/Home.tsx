import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import Skeleton from "../components/UI/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PaginationPage} from "../components/Pagination/PaginationPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas, selectorPizza} from "../redux/slices/pizzasSlice";
import NotFoundPage from "../components/NotFoundPage";
import {useNavigate} from "react-router";
import {selectorFilter} from "../redux/slices/filterSlice";

export const Home : React.FC = () => {

    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(4);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {sort,categoryId,search} = useSelector(selectorFilter)
    const {items,status} = useSelector(selectorPizza);

    const sortType = sort.sortProperty;
    const searchValue = search;



    useEffect(() => {
        async function getPizzaDate() {
            const isDeskPropertyPositive = sortType.includes('-') ? 'asc' : 'desc';
            const sortTypeReplace = sortType.replace('-','');
            const searchValueBase = searchValue ? `&search=${searchValue}` : '';

            dispatch(
                // @ts-ignore
                fetchPizzas({
                isDeskPropertyPositive,
                searchValueBase,
                sortTypeReplace,
                categoryId,
                currentPage,
            }));
        }

        getPizzaDate();
        // window.scrollTo(0,300)
    }, [categoryId,sortType,searchValue,currentPage]);


    //
    // Pagination
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const currentPosts = items.slice(firstPostIndex,lastPostIndex);
    const filteredItems =  currentPosts.filter((item : any) => (item.title).toLowerCase().includes(searchValue.toLowerCase()));


    const skeletons = [...new Array(4)].map((_,index) => <Skeleton key ={index}/>);
    const pizzas =  filteredItems.map((obj : any) => <PizzaBlock key={obj.id} {...obj} />)

    return (
            <>

                <div className="content__top">
                    <Categories/>
                    <Sort/>
                </div>

                <h2 className="content__title">Всі піци</h2>

                <div className="content__items">
                    {status === 'error' ? <NotFoundPage/> : ''}
                    {status === 'loading' ? skeletons : pizzas}
                </div>
                <PaginationPage
                    currentPosts = {items.length}
                    postsPerPage = {postsPerPage}
                    setCurrentPage = {setCurrentPage}

                />

            </>
    );
};

