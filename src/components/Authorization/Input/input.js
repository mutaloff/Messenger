import React, { useRef } from 'react'
import { useState } from 'react';
import { UserAPI } from '../../../api';
import styles from './input.module.css'


export function Input({ type, changeHandler, value, placeholder, password, signin }) {
    const [warning, setWarning] = useState('');

    const validationHandler = (e) => {
        changeHandler(e);
        if (e.target.value.length === 0) {
            setWarning('Пустое поле')
        } else if (!signin) switch (type) {
            case 'login':
                if (e.target.value.length > 4) {
                    UserAPI.checkUser(e.target.value).then(data => {
                        if (data.length) {
                            setWarning('Логин уже занят')
                        }
                    })
                }
                if (e.target.value.length < 5 && e.target.value.length > 0) {
                    setWarning('Логин слишком короткий')
                } else {
                    setWarning('')
                }
                break;

            case 'password':
                if (typeof password !== 'undefined') {
                    if (password !== e.target.value && e.target.value.length > 0) {
                        setWarning('Пароли не совпадают')
                    } else {
                        setWarning('')
                    }
                } else if (e.target.value.length < 8 && e.target.value.length > 0) {
                    setWarning('Пароль слишком короткий')
                } else {
                    setWarning('')
                }
                break;

            default:
                setWarning('')
                break;
        } else {
            setWarning('')
        }

    }
    return <div>
        <div className={styles.input}>
            <div className={styles.placeholder}>{value && placeholder}</div>
            <input
                className={styles.textbox}
                type={type}
                onChange={validationHandler}
                value={value}
                placeholder={placeholder}>
            </input>
            <div className={styles.warning}>{warning}</div>
        </div>
    </div>
}