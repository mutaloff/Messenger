import React, { useEffect, useState } from 'react';
import styles from './chatWindow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/messageReducer';
import { v4 } from 'uuid';
import Message from '../Message/message'

function ChatWindow({ messages, hasMessages, loginTo }) {

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const [fetching, setFetching] = useState(true)

    const loginFrom = useSelector(state => state.authReducer.login)

    const totalCount = useSelector(state => state.messageReducer.totalCount)

    const userData = useSelector(state => state.authReducer.userData)

    const receiverData = useSelector(state => state.messageReducer.receiver)

    useEffect(() => setPage(1), [loginTo])

    useEffect(() => {
        setFetching(true)
    }, [messages])

    const scroll = (e) => {
        if (e.target.scrollTop < e.target.offsetHeight - e.target.scrollHeight + 100 && fetching && page < Math.ceil(totalCount / 50)) {
            setFetching(false)
            setPage(prevState => {
                dispatch(getMessages(loginFrom, loginTo, page, true, 50))
                return prevState + 1
            })
        }
    }
    return <div className={styles.window} onScroll={scroll} >
        {
            hasMessages
                ? messages.map((message, i) => (
                    (message.sender_login === loginTo || message.receiver_login === loginTo) &&
                    <Message
                        userData={userData}
                        receiverData={receiverData}
                        message={message}
                        messages={messages}
                        loginTo={loginTo}
                        index={i}
                        key={v4()} />
                ))
                : !messages.length && <h1>Сообщений пока нет</h1>
        }
    </div>
}


export default ChatWindow; 