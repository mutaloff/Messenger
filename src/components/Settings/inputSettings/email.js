import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../../api";
import { resetEmail } from "../../../redux/actions";
import styles from './inputSettings.module.css'

const Email = ({ email, login }) => {

    const inputRef = useRef()

    const dispatch = useDispatch()

    const [displayInput, setDisplayInput] = useState(false)

    const [displayWarning, setDisplayWarning] = useState(false)

    const inputHandler = (e) => {
        setDisplayInput(!displayInput)
    }

    const [text, setText] = useState(email)

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        email && setText(email)
    }, [email])

    const blurHandler = (e) => {
        setDisplayInput(!displayInput)
        dispatch(resetEmail(text))
        UserAPI.setEmail(login, text)
    }

    useEffect(() => {
        displayInput && inputRef.current.focus()
    }, [displayInput])

    return <>
        <div className={styles.main}>
            <div
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setDisplayWarning(true)}
                onMouseLeave={() => setDisplayWarning(false)}>
                Email
            </div>
            <div
                onDoubleClick={inputHandler}
                className={styles.href}
                style={{ display: !displayInput ? 'block' : 'none' }}>
                {text ? text : 'Нажмите сюда два раза, чтобы установить email'}
            </div>
            <input
                type='email'
                value={text}
                onChange={changeHandler}
                className={styles.input}
                placeholder='Вставьте адрес электронной почты'
                ref={inputRef}
                onBlur={blurHandler}
                style={{ display: displayInput ? 'block' : 'none' }}
            />
        </div>
        <div
            className={styles.warning}
            style={{ display: displayWarning ? 'flex' : 'none' }}>
            * Для того чтобы получать email, необходимо включить доступ к imap в почте, также необходимо отключить ограничения для сторонних клиентов
        </div>
    </>
}

export default Email;