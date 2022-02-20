import React from "react";
import ChatWindow from "./ChatWindow/chatWindow";
import TextInput from "./TextInput/textInput";
import styles from "./chat.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentReceiver } from "../../redux/actions";
import { Absence } from "./Absence/absence";
import { useWindowSize } from "../../customHooks/useWindowSize";
import { useParams } from 'react-router-dom';

function Chat(props) {
    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(setCurrentReceiver(null))
    }

    const loginTo = useParams().login

    const messages = useSelector(state => state.messageReducer.messages)

    const receiver = useSelector(state => state.messageReducer.receiver)

    const subscription = useSelector(state => state.contactReducer.subscription)

    const [width, height] = useWindowSize()

    const hasMessages = messages.some(message => message.sender_login === loginTo || message.receiver_login === loginTo)

    return <div className={styles.chat} style={{ height: `${height}px` }}>
        <div className={styles.infoBar}>
            {
                width < 700 && <Link to={'messages'} onClick={clickHandler} className={styles.backButton}>
                    <h4>❮</h4>
                    <p className={styles.back}>Назад</p>
                </Link>
            }
            <div className={styles.name}>{receiver && `${receiver.firstname} ${receiver.lastname}`}</div>
        </div>
        {
            (!receiver?.is_private || subscription === true)
                ? <>
                    <div className={styles.chatWindow} style={{ height: `${height - 110}px` }}>
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