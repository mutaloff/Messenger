import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow/chatWindow";
import TextInput from "./TextInput/textInput";
import styles from "./chat.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetMessageCount, setCurrentReceiver, setMessageFetching, setMessagesRead, setUserSubscription } from "../../redux/actions";
import { Absence } from "./Absence/absence";
import { useWindowSize } from "../../customHooks/useWindowSize";
import { useParams } from 'react-router-dom';
import { setReceiver } from "../../redux/messageReducer";
import { getUser } from "../../redux/authReducer";
import { getMessages } from "../../redux/messageReducer";
import { UserAPI } from "../../api";
import Loader from "../Common/Loader/loader";
import chatLoaderIcon from "../../assets/imgs/chat-loader.gif";
import socket from "../../socket";
import BackButton from "./BackButton/backButton";

function Chat(props) {
    const dispatch = useDispatch()

    const subscription = useSelector(state => state.contactReducer.subscription)

    const { messages, isMessagesFetching, receiver, messagesCount } = useSelector(state => state.messageReducer)

    const loginTo = useParams().login

    const loginFrom = useSelector(state => state.authReducer.login)

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            socket.off('read')
            socket.on('read', () => {
                dispatch(setMessagesRead())
            })
        }
    })

    useEffect(() => {
        if (loginTo) {
            socket.emit('readMessage', loginTo, loginFrom)
            dispatch(setMessageFetching(true))
            dispatch(getUser(loginFrom))
            dispatch(setReceiver(loginTo))
            UserAPI.checkSubscription(loginFrom, loginTo).then(data => {
                data?.subscription === true
                    ? dispatch(setUserSubscription(true))
                    : dispatch(setUserSubscription(false))
            })
            dispatch(getMessages(loginFrom, loginTo, 0, false, messagesCount > 50 ? messagesCount + 20 : 50))
        }
        return () => {
            dispatch(setCurrentReceiver(null))
            dispatch(resetMessageCount(loginTo))
        }
    }, [loginTo])

    const hasMessages = messages.some(message => message.sender_login === loginTo || message.receiver_login === loginTo)

    const [width, height] = useWindowSize()

    return <div className={styles.chat} style={{ height: `${height}px` }}>
        <div className={styles.infoBar}>
            {
                width < 700 && <BackButton />
            }
            <div className={styles.name}>{receiver && `${receiver.firstname} ${receiver.lastname}`}</div>
        </div>
        {
            isMessagesFetching
                ? <Loader source={chatLoaderIcon} size={50} />
                : (!receiver?.is_private || subscription === true)
                    ? <>
                        <div className={styles.chatWindow} style={{ height: `${height - 100}px` }}>
                            <ChatWindow messages={messages} hasMessages={hasMessages} loginTo={loginTo} />
                        </div>
                        <div className={styles.textInput}>
                            <TextInput hasMessages={hasMessages} />
                        </div>
                    </>
                    : <Absence text='Аккаунт приватный, добавьтесь сначала в контакты' />
        }
    </div >
}

export default Chat;