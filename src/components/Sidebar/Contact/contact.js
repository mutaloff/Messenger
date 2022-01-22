import React, { useEffect, useMemo, useState } from "react";
import styles from "./contact.module.css"
import userLogo from '../../../assets/imgs/user_icon.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReceiver } from "../../../redux/messageReducer";
import { getMessages, setReadMessages } from "../../../redux/messageReducer";
import { MessageAPI } from "../../../api";


function Contact(props) {
    const dispatch = useDispatch()
    const [messagesCount, setMessagesCount] = useState(0)

    const loginTo = useSelector(state => {
        return state.messageReducer.receiver?.login
    })

    const loginFrom = useSelector(state => {
        return state.authReducer.login
    })

    MessageAPI.getUnreadMessagesCount(props.contact.login, loginFrom).then(data => {
        if (!data[0].sender_login) data[0].sender_login = loginFrom
        props.contact.login == loginTo ? setMessagesCount(0) : setMessagesCount(data[0].count)
        props.contact.login == loginTo && dispatch(setReadMessages(props.contact.login, loginFrom))
    })

    const clickHandler = () => {
        dispatch(setReadMessages(props.contact.login, loginFrom))
        dispatch(setReceiver(props.contact.login))
        props.contact.login != loginTo && dispatch(getMessages(props.contact.login, loginFrom, 0, false))
    }
    return <Link to={props.link} className={styles.link}>
        <div className={styles.contact} onClick={clickHandler} style={!props.navPanelIsVisible ? { width: 63 + 'px' } : {}}>
            <img src={userLogo} className={styles.icon} />
            <div className={styles.user}>
                {props.contact.firstname}
                {
                    props.onlineContacts.map((onlineContact, i) => (
                        props.contact.login === onlineContact.login &&
                        <div key={i} className={styles.online}>Online</div>
                    ))
                }
            </div>
            {
                props.navPanelIsVisible && <div
                    className={styles.unreadCount}
                    style={!messagesCount ? { display: 'none' } : { display: 'block' }}>
                    {messagesCount}
                </div>
            }
        </div>
    </Link>
}

export default Contact;