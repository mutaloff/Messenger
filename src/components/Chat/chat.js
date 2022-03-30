import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow/chatWindow";
import TextInput from "./TextInput/textInput";
import styles from "./chat.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteMessages, resetMessageCount, setCurrentReceiver, setMessageFetching, setMessagesRead, setReadyData, setUserSubscription } from "../../redux/actions";
import { Absence } from "./Absence/absence";
import { useWindowSize } from "../../customHooks/useWindowSize";
import { useParams } from 'react-router-dom';
import { setReceiver } from "../../redux/messageReducer";
import { getUser } from "../../redux/authReducer";
import { getMessages } from "../../redux/messageReducer";
import { MessageAPI, UserAPI } from "../../api";
import Loader from "../Common/Loader/loader";
import chatLoaderIcon from "../../assets/imgs/chat-loader.gif";
import deleteIcon from "../../assets/imgs/trash.png";
import socket from "../../socket";
import BackButton from "./BackButton/backButton";
import SearchMessages from "./SearchMessages/searchMessages";
import { getContacts } from "../../redux/contactReducer";

function Chat(props) {

    const dispatch = useDispatch()

    const subscription = useSelector(state => state.contactReducer.subscription)

    const { messages, isMessagesFetching, receiver, messagesCount } = useSelector(state => state.messageReducer)

    const userData = useSelector(state => state.authReducer.userData)

    const loginTo = useParams().login

    const loginFrom = useSelector(state => state.authReducer.login)

    const [userMessages, setUserMessages] = useState(messages);

    const [showCheck, setShowCheck] = useState(false);

    const [searchingText, setSearchingText] = useState('');

    const [isSearching, setIsSearching] = useState(false)

    const { readyPoint, readyData } = useSelector(state => state.appReducer)


    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            socket.off('read')
            socket.on('read', () => {
                dispatch(setMessagesRead())
            })
        }
    })

    useEffect(() => {
        setUserMessages(messages)
        setShowCheck(false)
    }, [messages])

    useEffect(() => {
        dispatch(getMessages(loginTo, loginFrom, 0, false, messagesCount > 50 ? messagesCount + 20 : 50, false))
    }, [])

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
        }
        return () => {
            dispatch(setCurrentReceiver(null))
            dispatch(resetMessageCount(loginTo))
            dispatch(setMessagesRead())
        }
    }, [loginTo])

    const deleteHandler = (e) => {
        MessageAPI.deleteMessages(readyData, messages, loginFrom, loginTo)
        dispatch(deleteMessages(readyData))
        dispatch(getContacts(loginFrom))
        dispatch(setReadyData(null))
        setShowCheck(false)
    }

    const hasMessages = messages.some(message => message.sender_login === loginTo || message.receiver_login === loginTo)

    const [width, height] = useWindowSize()

    return <div className={styles.chat} style={{ height: `${height}px` }}>
        <div className={styles.infoBar} style={{ justifyContent: isSearching ? 'flex-end' : 'center' }}>
            {
                width < 700 && <BackButton />
            }
            {
                !isSearching && !readyPoint &&
                <div className={styles.name}>{receiver && `${receiver.firstname} ${receiver.lastname}`}</div>
            }
            {
                showCheck
                    ? <img
                        onClick={deleteHandler}
                        src={deleteIcon}
                        className={styles.deleteMessages}
                    />
                    : <SearchMessages
                        readyPoint={readyPoint}
                        setUserMessages={setUserMessages}
                        loginTo={loginTo}
                        loginFrom={loginFrom}
                        setSearchingText={setSearchingText}
                        setIsSearching={setIsSearching}
                        isSearching={isSearching}
                        searchingText={searchingText}
                    />
            }

        </div>
        {
            isMessagesFetching
                ? <Loader source={chatLoaderIcon} size={50} />
                : (!receiver?.is_private || subscription === true)
                    ? <>
                        <div className={styles.chatWindow} style={{ height: `${height - 100}px` }}>
                            <ChatWindow
                                messages={userMessages}
                                hasMessages={hasMessages}
                                loginTo={loginTo}
                                searchingText={searchingText}
                                showCheck={showCheck}
                                setShowCheck={setShowCheck}
                            />
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