import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authReducer";
import styles from './settings.module.css'

export const Settings = (props) => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.authReducer.login)
    const exitHandler = (e) => {
        dispatch(logoutUser(login))
    }
    return <div className={styles.settings}>
        <button className={styles.button} onClick={exitHandler}>Выйти</button>
    </div>
}