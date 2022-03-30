import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { MessageAPI } from "../../../api";
import userLogo from '../../../assets/imgs/user_icon.png'
import { resetImportance } from "../../../redux/actions";
import { importanceConvert } from "../../../utils/importanceConvert";
import styles from './userPage.module.css';

const UserPage = ({ contact }) => {

    const dispatch = useDispatch()

    const [importanceValue, setImportance] = useState(contact.importance)

    const login = useSelector(state => state.authReducer.login)

    const changeHandler = (e) => {
        setImportance(e.target.value)
    }
    const importanceHandler = (e) => {
        dispatch(resetImportance(contact.login, importanceValue))
        MessageAPI.setImportance(login, contact.login, importanceValue)
    }

    return <div className={styles.profile}>
        <div className={styles.ava} >
            <img
                src={contact.avatar ? contact.avatar : userLogo}
                className={styles.img}
                style={{ filter: contact.avatar ? '' : 'grayscale()' }}
            />
            <div>{contact.status}</div>
        </div>
        <div className={styles.label}>Данные контакта:</div>
        <div className={styles.contactInfo}>
            <div className={styles.contactData}>
                <div className={styles.info}>Логин:  </div>
                <div className={styles.info}>{contact.login}</div>
            </div>
            <div className={styles.contactData}>
                <div className={styles.info}>Имя:  </div>
                <div className={styles.info}>{contact.firstname}</div>
            </div>
            <div className={styles.contactData}>
                <div className={styles.info}>Фамилия:</div>
                <div className={styles.info}>{contact.lastname}</div>
            </div>
        </div>
        {
            isFinite(contact.importance) && <>
                <div className={styles.label}>Важность контакта:</div>
                <div className={styles.importance}>
                    <input
                        type="range" min="0" max="4"
                        value={importanceValue}
                        onChange={changeHandler}
                        className={styles.importanceValue}
                        onBlur={importanceHandler}
                        onTouchEnd={importanceHandler}
                    />
                    <div className={styles.importanceStatus}>{importanceConvert(importanceValue)}</div>
                </div>
            </>
        }
    </div>
}

export default UserPage
