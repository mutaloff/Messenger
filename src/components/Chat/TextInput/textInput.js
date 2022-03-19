import React, { useEffect, useRef, useState } from "react";
import styles from "./textInput.module.css";
import { sendMessage } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import sendLogo from '../../../assets/imgs/send_icon.png';
import socket from "../../../socket";
import { setMessage } from "../../../redux/messageReducer";
import { UserAPI } from "../../../api";
import { keyPress } from "../../../utils/keyPress"

function TextInput(props) {

    const [text, setText] = useState('');

    const [sendIcon, setSendIcon] = useState(false)

    const dispatch = useDispatch();

    const inputRef = useRef(null)

    const receiver_login = useSelector(state => state.messageReducer.receiver?.login)

    const firstname = useSelector(state => state.authReducer.userData?.firstname)

    const sender_login = useSelector(state => state.authReducer.login)

    const subscription = useSelector(state => state.contactReducer.subscription)

    const changeHandler = (e) => {
        setSendIcon(true);
        setText(e.target.value);
    }

    const handleClick = (e) => {
        inputRef.current.focus()
        if (!props.hasMessages && subscription === false) {
            UserAPI.subscribe(sender_login, receiver_login)
            UserAPI.subscribe(receiver_login, sender_login)
        }
        text.length && socket.emit('sendMessage', { sender_login, receiver_login, text, firstname });
        text.length && dispatch(setMessage(sender_login, [receiver_login], text))
        text.length && setText('');
        text.length && dispatch(sendMessage({ sender_login, receiver_login, text, firstname }));
    }

    return <div className={styles.sender}>
        <input
            ref={inputRef}
            onChange={changeHandler}
            onKeyPress={(e) => keyPress(e, handleClick)}
            className={styles.input}
            value={text}
            placeholder='Введите сообщение...'
        />
        {
            (sendIcon && text.length)
                ? <img onClick={handleClick} src={sendLogo} className={styles.img} />
                : ''
        }
    </div>
}


export default TextInput;