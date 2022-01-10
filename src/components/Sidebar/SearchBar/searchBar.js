import React, { useState } from "react";
import styles from './searchBar.module.css'
import editIcon from '../../../assets/imgs/edit_icon.png'
import searchIcon from '../../../assets/imgs/search_icon.png'
import { searchUser, getContacts } from "../../../redux/contactReducer";
import { useDispatch } from "react-redux";

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch()

    const changeHandler = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value === '') {
            dispatch(getContacts(props.userLogin))
        } else {
            dispatch(searchUser(e.target.value))
        }
    }
    return <div className={styles.searchBar}>

        {
            props.navPanelIsVisible &&
            <>
                <img src={searchIcon} className={styles.searchImg} />
                <input
                    className={styles.input}
                    placeholder='Поиск'
                    value={searchValue}
                    onChange={changeHandler}
                />
            </>
        }
        <img src={editIcon} className={styles.editImg}></img>
    </div>
}

export default SearchBar;