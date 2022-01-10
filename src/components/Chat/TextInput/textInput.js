import React, { useState } from "react";
import styles from "./textInput.module.css";
import { sendMessage } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import sendLogo from '../../../assets/imgs/send_icon.png';
import socket from "../../../socket";
import { setMessage } from "../../../redux/messageReducer";

function TextInput(props) {
    const [text, setText] = useState('');
    const [sendIcon, setSendIcon] = useState(false)
    const dispatch = useDispatch();

    const receiver_login = useSelector(state => {
        return state.messageReducer.receiver
    })

    const sender_login = useSelector(state => {
        return state.authReducer.login
    })

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    }
    const handleInput = (e) => {
        setSendIcon(true);
        setText(e.target.value);
    }
    const handleClick = (e) => {
        text.length && socket.emit('sendMessage', { sender_login, receiver_login, text });
        setMessage(sender_login, receiver_login, text)
        setText('');
        text.length && dispatch(sendMessage({ sender_login, receiver_login, text }));
    }
    return <div className={styles.sender}>
        <input onChange={handleInput} onKeyPress={handleKeyPress} className={styles.input} value={text} placeholder='Введите сообщение...' />
        {
            (sendIcon && text.length)
                ? <img onClick={handleClick} src={sendLogo} className={styles.img} />
                : ''
        }
    </div>
}


export default TextInput;