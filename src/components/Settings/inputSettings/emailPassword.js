import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../../api";
import { resetEmailPassword } from "../../../redux/actions";
import styles from './inputSettings.module.css'

const EmailPassword = ({ emailPassword, login }) => {

    const inputRef = useRef()

    const dispatch = useDispatch()

    const [displayInput, setDisplayInput] = useState(false)

    const inputHandler = (e) => {
        setDisplayInput(!displayInput)
    }
    const [text, setText] = useState('')

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        if (emailPassword) {
            setText(emailPassword)
        }
    }, [emailPassword])

    const blurHandler = (e) => {
        setDisplayInput(!displayInput)
        dispatch(resetEmailPassword(text))
        UserAPI.setEmailPassword(login, text)
    }

    useEffect(() => {
        displayInput && inputRef.current.focus()
    }, [displayInput])

    return <div className={styles.main}>
        <div>Пароль от email</div>
        <div
            onDoubleClick={inputHandler}
            className={styles.href}
            style={{ display: !displayInput ? 'block' : 'none', fontFamily: text ? 'password' : '' }}>
            {text ? text : 'Нажмите сюда два раза, чтобы установить пароль от Email'}
        </div>
        <input
            value={text}
            onChange={changeHandler}
            className={styles.input}
            placeholder='Вставьте пароль от электронной почты'
            ref={inputRef}
            onBlur={blurHandler}
            style={{ display: displayInput ? 'block' : 'none', fontFamily: 'password' }}
        />
    </div >
}

export default EmailPassword;