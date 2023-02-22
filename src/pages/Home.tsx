import React, {useEffect, useRef, useState} from 'react';
import {Categories} from "../components/Categories/Categories";
import {Sort, sortItems} from "../components/Sort/Sort";
import Skeleton from "../components/UI/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PaginationPage} from "../components/Pagination/PaginationPage";
import {useSelector} from "react-redux";
import {fetchPizzas} from "../redux/slices/pizza/asyncAction";
import NotFoundPage from "../components/NotFoundPage";
import {useNavigate} from "react-router";
import {setFilters} from "../redux/slices/filter/slice";
import {selectorFilter} from '../redux/slices/filter/selector'
import {selectorPizza} from "../redux/slices/pizza/selector";

import {useAppDispatch} from '../redux/store';
import qs from 'qs';

export const Home : React.FC = () => {

    const [postsPerPage,setPostsPerPage] = useState(4);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {sort,categoryId,search,currentPage} = useSelector(selectorFilter)
    const {items,status} = useSelector(selectorPizza);

    const sortType = sort.sortProperty;
    const searchValue = search;

    // Якщо змінились параметри і був перший рендер
    useEffect(() =>{
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortType,
                searchValue,
                currentPage
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;

    },[categoryId,sortType,searchValue,currentPage])

    // Якщо був перший рендер,то перевіряємо URL-параметри і зберігаємо в редаксі
    useEffect(() => {

        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortItems.find((obj) => obj.sortProperty === params.sortType);
            dispatch(setFilters({
                ...params,
                sort

            }))

            isSearch.current = true;
        }
    },[])

    async function getPizzaDate() {
        const isDeskPropertyPositive = sortType.includes('-') ? 'asc' : 'desc';
        const sortTypeReplace = sortType.replace('-','');
        const searchValueBase = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                isDeskPropertyPositive,
                searchValueBase,
                sortTypeReplace,
                categoryId,
                currentPage,
            }));
    }

    // Якщо був перший рендер,то робимо запит на піци
    useEffect(() => {
        if (!isSearch.current) {
            getPizzaDate();
        }

        isSearch.current = false;
        // window.scrollTo(0,300)
    }, [categoryId,sortType,searchValue,currentPage]);



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

                />
            </>
    );
};

