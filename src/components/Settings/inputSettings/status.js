import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../../api";
import { resetStatus } from "../../../redux/actions";
import styles from './inputSettings.module.css'

const Status = ({ status, login }) => {

    const inputRef = useRef()

    const dispatch = useDispatch()

    const [displayInput, setDisplayInput] = useState(false)

    const inputHandler = (e) => {
        setDisplayInput(!displayInput)
    }

    const [text, setText] = useState(status)

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        status && setText(status)
    }, [status])

    const blurHandler = (e) => {
        setDisplayInput(!displayInput)
        dispatch(resetStatus(text))
        UserAPI.setStatus(login, text)
    }

    useEffect(() => {
        displayInput && inputRef.current.focus()
    }, [displayInput])

    return <div className={styles.main}>
        <div>Статус</div>
        <div
            onDoubleClick={inputHandler}
            className={styles.href}
            style={{ display: !displayInput ? 'block' : 'none' }}>
            {text ? text : 'Нажмите сюда два раза, чтобы установить статус'}
        </div>
        <input
            value={text}
            onChange={changeHandler}
            className={styles.input}
            placeholder='Вставьте статус'
            ref={inputRef}
            onBlur={blurHandler}
            style={{ display: displayInput ? 'block' : 'none' }}
        />
    </div >
}

export default Status;