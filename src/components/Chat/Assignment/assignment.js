import React, { useEffect, useState } from "react";
import { timer } from "../../../utils/timing";
import styles from './assignment.module.css'

const Assignment = ({ message, setTimeout, messages }) => {

    const [seconds, setSeconds] = useState(timer(new Date(message.assignment_term) - new Date(), message))

    useEffect(() => {
        let timerID;
        setSeconds(timer(new Date(message.assignment_term) - new Date(), message))
        if (!message.is_done) {
            timerID = setInterval(() => setSeconds(timer(new Date(message.assignment_term) - new Date(), message)), 1000);
            if (new Date(message.assignment_term) - new Date() < 0) {
                setTimeout(true)
                clearInterval(timerID);
            }
        }
        return () => clearInterval(timerID);
    }, [messages])

    return <div
        className={styles.task}
        style={{ color: new Date(message.assignment_term) - new Date() < 0 ? 'gray' : 'black' }}>
        <div
            className={styles.assignment}
            style={{ textDecoration: message.is_done ? 'line-through' : '' }}>
            {message.assignment}
        </div>
        <div
            style={{ textDecoration: message.is_done ? 'line-through' : '' }}
            className={styles.text}>
            {message.text}
        </div>
        <div className={styles.time}>{message.is_done ? 'Выполнено' : seconds}</div>
    </div>
}


export default Assignment