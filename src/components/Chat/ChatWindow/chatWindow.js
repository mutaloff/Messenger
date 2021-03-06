import React, { useEffect, useState } from 'react';
import styles from './chatWindow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/messageReducer';
import Message from '../Message/message'
import { Absence } from '../Absence/absence';

function ChatWindow({ messages, hasMessages, loginTo, searchingText, showCheck, setShowCheck, userData }) {

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const [fetching, setFetching] = useState(true)

    const loginFrom = useSelector(state => state.authReducer.login)

    const totalCount = useSelector(state => state.messageReducer.totalCount)

    const receiverData = useSelector(state => state.messageReducer.receiver)

    useEffect(() => setPage(1), [loginTo, searchingText])

    useEffect(() => setFetching(true), [messages])

    const scroll = (e) => {
        if (e.target.scrollTop < e.target.offsetHeight - e.target.scrollHeight + 100 && fetching && page < Math.ceil(totalCount / 50)) {
            setFetching(false)
            setPage(prevState => {
                !searchingText && dispatch(getMessages(loginTo, loginFrom, page, true, 50, false, false))
                return prevState + 1
            })
        }
    }
    return <div className={styles.window} onScroll={scroll}>
        {
            hasMessages
                ? messages.map((message, i) => (
                    (message.sender_login === loginTo || message.receiver_login === loginTo) &&
                    <Message
                        showCheck={showCheck}
                        setShowCheck={setShowCheck}
                        userData={userData}
                        receiverData={receiverData}
                        message={message}
                        messages={messages}
                        loginTo={loginTo}
                        index={i}
                        key={i}
                    />
                ))
                : !messages.length && <Absence text='Сообщений пока нет' />
        }
    </div>
}


export default ChatWindow; 