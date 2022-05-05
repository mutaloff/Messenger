import React, { useEffect, useState } from "react";
import styles from './searchBar.module.css'
import editIcon from '../../../assets/imgs/edit_icon.png'
import searchIcon from '../../../assets/imgs/search_icon.png'
import contactOption from '../../../assets/imgs/contact_option.png'
import { searchUser, getContacts, searchLabels } from "../../../redux/contactReducer";
import { useDispatch, useSelector } from "react-redux";
import { setPopupOption } from "../../../redux/actions";
import { UserAPI } from "../../../api";

function SearchBar(props) {

    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch()

    const [contactDelete, setContactDelete] = useState(false)

    const [createFolder, setCreateFolder] = useState(false)

    const popupOption = useSelector(state => state.appReducer.popupOption)

    const readyPoint = useSelector(state => state.appReducer.readyPoint)

    const readyData = useSelector(state => state.appReducer.readyData)

    const cancelHandler = () => {
        if (readyPoint && popupOption === 'createFolder') {
            UserAPI.createFolder(props.userLogin, readyData)
        }
        dispatch(setPopupOption(null))
        dispatch(getContacts(props.userLogin))
    }

    const changeHandler = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value === '') {
            dispatch(getContacts(props.userLogin))
        } else {
            if (e.target.value[0] === '#') {
                dispatch(searchLabels(props.userLogin, e.target.value))
            } else {
                dispatch(searchUser(e.target.value))
            }
        }
    }

    useEffect(() => {
        if (popupOption === 'deleteContact') {
            setContactDelete(true)
        } else if (popupOption === 'createFolder') {
            setCreateFolder(true)
        } else if (!popupOption) {
            setContactDelete(false)
            setCreateFolder(false)
        }
    }, [popupOption])

    return <div className={styles.searchBar}>
        {
            <>
                <img src={searchIcon} className={styles.searchImg} />
                <input
                    className={styles.input}
                    placeholder='Поиск'
                    value={searchValue}
                    onChange={changeHandler}
                />
                {
                    (contactDelete || createFolder) &&
                    <div
                        className={styles.cancel}
                        onClick={() => cancelHandler()}>
                        {readyPoint ? 'Готово' : 'Отмена'}
                    </div>
                }

            </>
        }
        {
            !contactDelete && !createFolder && <img
                src={props.location === 'messages/' ? editIcon : contactOption}
                className={styles.editImg}
                onClick={() => props.popupDisplayHandler()}>
            </img>
        }
    </div >
}

export default SearchBar;