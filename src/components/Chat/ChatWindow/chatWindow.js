import React, { useEffect, useMemo } from 'react';
import styles from './chatWindow.module.css';
import userLogo from '../../../assets/imgs/user_icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/messageReducer';
import { useParams } from 'react-router-dom';
import { setCurrentReceiver } from '../../../redux/actions';

function ChatWindow({ messages }) {
    const dispatch = useDispatch()
    const loginTo = useParams().login

    const loginFrom = useSelector(state => {
        return state.authReducer.login
    })

    useEffect(() => {
        if (loginTo) {
            dispatch(getMessages(loginFrom, loginTo))
            dispatch(setCurrentReceiver(loginTo))
        }
    }, [])

    return <div className={styles.window}>
        {
            messages.some(message => message.sender_login === loginTo || message.receiver_login === loginTo)
                ? messages.map((message, i) => (
                    (message.sender_login === loginTo || message.receiver_login === loginTo) &&
                    <div className={styles.message} key={i}>
                        <img src={userLogo} className={styles.logo} />
                        <div>
                            <div className={styles.username}>{message.sender_login}</div>
                            <li className={styles.messageText}>{message.text}</li>
                        </div>
                    </div>
                ))
                : <h1>Сообщений пока нет</h1>
        }
    </div >
}

export default ChatWindow;