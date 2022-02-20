import React, { useEffect, useState } from 'react';
import styles from './chatWindow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/messageReducer';
import { setReceiver } from '../../../redux/messageReducer';
import { getUser } from '../../../redux/authReducer';
import Message from '../Message/message'

function ChatWindow({ messages, hasMessages, loginTo }) {
    const dispatch = useDispatch()

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
            hasMessages
                ? messages.map((message, i) => (
                    (message.sender_login === loginTo || message.receiver_login === loginTo) &&
                    <Message message={message} messages={messages} index={i} key={i} />
                ))
                : !messages.length && <h1>Сообщений пока нет</h1>
        }
    </div>
}


export default ChatWindow; 