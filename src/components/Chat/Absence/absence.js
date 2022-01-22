import React, { useEffect } from "react";
import { setReceiver } from "../../../redux/messageReducer";
import styles from './absence.module.css'
import { useDispatch } from "react-redux";

export const Absence = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setReceiver(null))
    })
    return <div className={styles.main}>
        <span className={styles.text}>{props.text}</span>
    </div>
}