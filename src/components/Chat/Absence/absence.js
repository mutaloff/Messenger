import React from "react";
import styles from './absence.module.css'

export const Absence = (props) => {
    return <div className={styles.main}>
        <span className={styles.text}>{props.text}</span>
    </div>
}