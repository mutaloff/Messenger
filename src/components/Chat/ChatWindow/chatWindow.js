import React, { useEffect, useState } from 'react';
import styles from './chatWindow.module.css';
import userLogo from '../../../assets/imgs/user_icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/messageReducer';
import { useParams } from 'react-router-dom';
import { setReceiver } from '../../../redux/messageReducer';
import { getUser } from '../../../redux/authReducer';

function ChatWindow({ messages }) {
    const dispatch = useDispatch()
    const loginTo = useParams().login
    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    const loginFrom = useSelector(state => {
        return state.authReducer.login
    })

    const totalCount = useSelector(state => {
        return state.messageReducer.totalCount
    })


    useEffect(() => {
        if (loginTo) {
            dispatch(getMessages(loginFrom, loginTo, 0, false))
            dispatch(getUser(loginFrom))
            dispatch(setReceiver(loginTo))
        }
    }, [])

    useEffect(() => setPage(1), [loginTo])
    useEffect(() => setFetching(true), [messages])

    const scroll = (e) => {
        if (e.target.scrollTop < e.target.offsetHeight - e.target.scrollHeight + 100 && fetching && page < Math.ceil(totalCount / 50)) {
            setFetching(false)
            setPage(prevState => {
                dispatch(getMessages(loginFrom, loginTo, page, true))
                return prevState + 1
            })
        }
    }

    return <div className={styles.window} onScroll={scroll} >
        {
            messages.some(message => message.sender_login === loginTo || message.receiver_login === loginTo)
                ? messages.map((message, i) => (
                    (message.sender_login === loginTo || message.receiver_login === loginTo) &&
                    <div className={styles.main} key={i}>
                        {
                            (!(message.date?.substr(0, 10) == messages[i + 1]?.date?.substr(0, 10)) && message.date) &&
                            <div className={styles.date} >
                                {
                                    `${messages[i]?.date?.substr(8, 2)}.${messages[i]?.date?.substr(5, 2)}.${messages[i]?.date?.substr(0, 4)}`
                                }
                            </div>
                        }
                        <div className={styles.message} >
                            {
                                (message.firstname != messages[i + 1]?.firstname) &&
                                <img src={userLogo} className={styles.logo} />
                            }
                            <div className={styles.messageBlock}>
                                {
                                    (message.firstname != messages[i + 1]?.firstname) &&
                                    <div className={styles.username}>{message.firstname}</div>
                                }
                                <li
                                    className={styles.messageText}
                                    style={(message.firstname == messages[i + 1]?.firstname)
                                        ? { paddingLeft: '65px', paddingTop: 0 }
                                        : {}}>
                                    {message.text}
                                </li>
                            </div>
                            <div className={styles.time}>
                                {
                                    message.date
                                        ? (message.date?.substr(11, 2) + message.date?.substr(13, 3))
                                        : new Date().getHours() + ":" + ('0' + new Date().getMinutes()).slice(-2)
                                }
                            </div>
                        </div>
                    </div>
                ))
                : !messages.length && <h1>Сообщений пока нет</h1>
        }
    </div >
}


export default ChatWindow;