import React from "react";
import { Link } from "react-router-dom";
import styles from './backButton.module.css'
import { setCurrentReceiver, setPage } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const BackButton = (props) => {
    const dispatch = useDispatch()
    const page = useSelector(state => state.appReducer.page)

    const clickHandler = () => {
        dispatch(setCurrentReceiver(null))
        page === 'settings/' && dispatch(setPage('messages/'))
    }

    return <Link to={'messages'} onClick={clickHandler} className={styles.backButton}>
        <h4>❮</h4>
        <p className={styles.back}>Назад</p>
    </Link>
}


export default BackButton