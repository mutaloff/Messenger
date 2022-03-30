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
        <div className={styles.arrow}><svg xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            fill="#7A77FF"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd" viewBox="0 0 298 511.93">
            <path fillRule="nonzero"
                d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z" />
        </svg></div>
        <p className={styles.back}>Назад</p>
    </Link>
}


export default BackButton