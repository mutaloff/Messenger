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
import { getAssignment, setReadMessages, setReceiver } from "../../redux/messageReducer";
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
import AssignmentPopup from "../Common/Popup/AssignmentPopup/assignmentPopup";
import assignmentIcon from "./../../assets/imgs/assignment.png"

function Chat(props) {

    const dispatch = useDispatch()

    const subscription = useSelector(state => state.contactReducer.subscription)

    const { messages, assignments, spams, isMessagesFetching, receiver, messagesCount } = useSelector(state => state.messageReducer)

    const userData = useSelector(state => state.authReducer.userData)

    const loginTo = useParams().login

    const loginFrom = useSelector(state => state.authReducer.login)

    const [userMessages, setUserMessages] = useState(messages);

    const [showCheck, setShowCheck] = useState(false);

    const [tabState, setTabState] = useState(0);

    const [searchingText, setSearchingText] = useState('');

    const [isSearching, setIsSearching] = useState(false)

    const { readyPoint, readyData } = useSelector(state => state.appReducer)

    const [displayAssignment, setDisplayAssignment] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            socket.off('read')
            socket.on('read', () => {
                dispatch(setMessagesRead())
            })
        }
    })
    useEffect(() => {
        if (tabState === 0) {
            setUserMessages(messages)
        } else if (tabState === 1) {
            setUserMessages(assignments)
        } else {
            setUserMessages(spams)
        }
        setShowCheck(false)
    }, [messages, assignments, spams, tabState])

    useEffect(() => {
        dispatch(getMessages(loginTo, loginFrom, 0, false, messagesCount > 50 ? messagesCount + 20 : 50, false, false))
        dispatch(getAssignment(loginTo, loginFrom))
        dispatch(getMessages(loginTo, loginFrom, 0, false, 0, false, true))
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
            setTabState(0)
        }
        return () => {
            dispatch(setCurrentReceiver(null))
            dispatch(resetMessageCount(loginTo))
            dispatch(setMessagesRead())
            dispatch(setReadMessages(loginTo, loginFrom))
        }
    }, [loginTo])

    const deleteHandler = (e) => {
        MessageAPI.deleteMessages(readyData, messages, loginFrom, loginTo)
        dispatch(deleteMessages(readyData))
        dispatch(getContacts(loginFrom))
        dispatch(setReadyData(null))
        setShowCheck(false)
    }

    const messagesHandler = (e) => {
        setTabState(0)
        setUserMessages(messages)
    }

    const assignmentsHandler = (e) => {
        setTabState(1)
        setUserMessages(assignments)
    }

    const spamHandler = (e) => {
        setTabState(2)
        setUserMessages(spams)
    }

    const hasMessages = userMessages.some(message => message.sender_login === loginTo || message.receiver_login === loginTo)

    const [width, height] = useWindowSize()

    return <div className={styles.chat} style={{ height: `${height}px` }}>
        <AssignmentPopup
            display={displayAssignment}
            setDisplay={setDisplayAssignment}
            loginTo={loginTo}
            loginFrom={loginFrom}
            firstname={userData?.firstname}
        />
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
        <div className={styles.buttons}>
            <div
                onClick={messagesHandler}
                style={{
                    opacity: tabState === 0 ? '100%' : '70%',
                    borderBottom: tabState === 0 ? 'rgb(105, 104, 182) solid 2px' : 'rgb(180, 180, 180) solid 1px'
                }}
                className={styles.messages}>
                Сообщения
            </div>
            <div
                onClick={assignmentsHandler}
                style={{
                    opacity: tabState === 1 ? '100%' : '70%',
                    borderBottom: tabState === 1 ? 'rgb(105, 104, 182) solid 2px' : 'rgb(180, 180, 180) solid 1px'
                }}
                className={styles.tasks}>
                Задачи
            </div>
            <div
                onClick={spamHandler}
                style={{
                    opacity: tabState === 2 ? '100%' : '70%',
                    borderBottom: tabState === 2 ? 'rgb(105, 104, 182) solid 2px' : 'rgb(180, 180, 180) solid 1px'
                }}
                className={styles.tasks}>
                Спам
            </div>
        </div>
        {
            isMessagesFetching
                ? <Loader source={chatLoaderIcon} size={50} />
                : (!receiver?.is_private || subscription === true)
                    ? <>
                        <div className={styles.chatWindow} style={{ height: `${height - 118}px` }}>
                            <ChatWindow
                                userData={userData}
                                messages={userMessages}
                                hasMessages={hasMessages}
                                loginTo={loginTo}
                                searchingText={searchingText}
                                showCheck={showCheck}
                                setShowCheck={setShowCheck}
                            />
                        </div>
                        <div className={styles.textInput}>
                            <div className={styles.assignment} onClick={() => setDisplayAssignment(true)}>
                                <img src={assignmentIcon} className={styles.assignmentIcon} />
                            </div>
                            <TextInput hasMessages={hasMessages} />
                        </div>
                    </>
                    : <Absence text='Аккаунт приватный, добавьтесь сначала в контакты' />
        }
    </div >
}

export default Chat;