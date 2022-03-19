import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UserAPI } from "../../../api";
import { resetAvatar } from "../../../redux/actions";
import styles from './inputSettings.module.css'

const Avatar = ({ avatar, login }) => {

    const inputRef = useRef()

    const dispatch = useDispatch()

    const [displayInput, setDisplayInput] = useState(false)

    const inputHandler = (e) => {
        setDisplayInput(!displayInput)
    }

    const [text, setText] = useState(avatar)

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        avatar && setText(avatar)
    }, [avatar])

    const blurHandler = (e) => {
        setDisplayInput(!displayInput)
        dispatch(resetAvatar(text))
        UserAPI.setAvatar(login, text)
    }

    useEffect(() => {
        displayInput && inputRef.current.focus()
    }, [displayInput])

    return <div className={styles.main}>
        <div>Ссылка на фото профиля</div>
        <div
            onDoubleClick={inputHandler}
            className={styles.href}
            style={{ display: !displayInput ? 'block' : 'none' }}>
            {text ? text : 'Нажмите сюда два раза, чтобы установить ссылку'}
        </div>
        <input
            value={text}
            onChange={changeHandler}
            className={styles.input}
            placeholder='Вставьте ссылку на картинку'
            ref={inputRef}
            onBlur={blurHandler}
            style={{ display: displayInput ? 'block' : 'none' }}
        />
    </div >
}

export default Avatar;