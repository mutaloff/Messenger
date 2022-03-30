import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setReadyPoint } from "../../../redux/actions";
import { getMessages } from "../../../redux/messageReducer";
import searchIcon from './../../../assets/imgs/search_icon.png';
import styles from './searchMessages.module.css'

const SearchMessages = ({ setSearchingText, searchingText, loginFrom, loginTo, isSearching, setIsSearching, readyPoint }) => {

    const inputRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => readyHandler(), [loginTo])

    useEffect(() => inputRef.current.focus(), [inputRef])

    const clickHandler = (e) => {
        setIsSearching(true)
    }

    const changeHandler = (e) => {
        setSearchingText(e.target.value)
    }

    const searchHandler = (e) => {
        dispatch(getMessages(loginTo, loginFrom, 0, false, 50, searchingText))
        dispatch(setReadyPoint(true))
    }
    const readyHandler = (e) => {
        isSearching && dispatch(getMessages(loginTo, loginFrom, 0, false, 50));
        setIsSearching(false)
        dispatch(setReadyPoint(false))
        setSearchingText('')
    }

    return <div className={styles.searchMessages} style={{ width: !isSearching ? '' : '60%' }}>
        <input
            ref={inputRef}
            className={styles.input}
            style={{ display: isSearching ? 'flex' : 'none' }}
            onChange={(e) => !readyPoint && changeHandler(e)}
            value={searchingText}
            placeholder='Введите сообщение'
            onBlur={() => !searchingText && setIsSearching(false)}
        />
        <img
            src={searchIcon}
            className={styles.icon}
            onClick={clickHandler}
            style={{
                display: searchingText.length ? 'none' : 'flex',
                position: !isSearching ? 'absolute' : 'sticky',
                right: !isSearching ? '10px' : '0'
            }}
        />
        {
            !readyPoint
                ? isSearching && <button
                    className={styles.button}
                    style={{ display: searchingText.length ? 'flex' : 'none' }}
                    onClick={searchHandler}
                >
                    {'Найти'}
                </button>
                : isSearching && <button
                    className={styles.button}
                    style={{ display: searchingText.length ? 'flex' : 'none' }}
                    onClick={readyHandler}
                >
                    {'Готово'}
                </button>
        }
    </div>
}


export default SearchMessages;