import React, {useCallback, useRef, useState} from 'react';
import './Search.scss'
import searchIcon from '../../assets/img/search.svg'
import closeIcon from '../../assets/img/closeIcon.svg'
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../redux/slices/filter/slice";
import {selectorSort} from '../../redux/slices/filter/selector'
import {debounce} from "@mui/material";

const Search  = () : JSX.Element => {
   const [value,setValue] = useState('');
   const searchValue = useSelector(selectorSort);
   const dispatch = useDispatch();
   const inputRef= useRef<HTMLInputElement>(null);

    const testDebounce = useCallback(
        debounce((str)=> {
            setValue(str);
            dispatch(setSearchValue(str));
        },250)
    ,[])

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>  {
       setValue(e.target.value);
       testDebounce(e.target.value);
   }


   const deleteInputDate = () => {
        setValue('');
        dispatch(setSearchValue(''))
        inputRef.current?.focus();

   }
    return (
        <div className='input__wrapper'>
            <img width={35} height={35} src={searchIcon} alt=""/>
            <input
                ref={inputRef}
                onChange={onChangeInput}
                value={value}
                placeholder='Пошук піци...'
                className='searchInput'
                type="text"
                name="SearchByPizzaName"
                id=""
            />
            {searchValue && <img onClick={deleteInputDate} width={35} height={35} className="closeImg" src={closeIcon} alt=""/>}
        </div>

    )
}

export default Search;
