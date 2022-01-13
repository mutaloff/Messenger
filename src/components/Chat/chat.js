import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow/chatWindow";
import TextInput from "./TextInput/textInput";
import styles from "./chat.module.css";
import { useSelector } from "react-redux";


function Chat(props) {

    const messages = useSelector(state => {
        return state.messageReducer.messages
    })
    return <div className={styles.chat}>
        <div className={styles.chatWindow}><ChatWindow messages={messages} /></div>
        <div className={styles.textInput}><TextInput /></div>
    </div >
}

export default React.memo(Chat);