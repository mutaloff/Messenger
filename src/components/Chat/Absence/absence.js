import React, { useEffect } from "react";
import styles from './absence.module.css'
import { useWindowSize } from "../../../customHooks/useWindowSize";
import BackButton from "../BackButton/backButton";
import { useDispatch, useSelector } from "react-redux";

export const Absence = (props) => {

    const receiver = useSelector(state => state.messageReducer.receiver)

    const [width, height] = useWindowSize()

    return <div className={styles.main}>
        <span className={styles.text}>{props.text}</span>
    </div>
}