import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow/chatWindow";
import TextInput from "./TextInput/textInput";
import styles from "./chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { sendMessage } from "../../redux/actions";
import { getContacts } from "../../redux/contactReducer";


function Chat(props) {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => {
        return state.authReducer.login
    })

    useEffect(() => {
        socket.off('getMessage')
        socket.on('getMessage', data => {
            dispatch(sendMessage(data))
            dispatch(getContacts(userLogin))
        })
    }, [])

    const messages = useSelector(state => {
        return state.messageReducer.messages
    })

    return <div className={styles.chat}>
        <div className={styles.chatWindow}><ChatWindow messages={messages} /></div>
        <div className={styles.textInput}><TextInput /></div>
    </div >
}

export default React.memo(Chat);