import React, { useEffect, useState } from "react";
import styles from "./contact.module.css"
import userLogo from '../../../assets/imgs/user_icon.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReceiver } from "../../../redux/messageReducer";
import { getMessages, setReadMessages } from "../../../redux/messageReducer";
import { getTiming } from "../../../utils/timing";
import { setReceiverMessageCount } from "../../../redux/actions";
import Subscription from "../Subscription/subscription";
import { dateConvert } from "../../../utils/dateConvert";
import { v4 } from 'uuid'
import { checkSource } from "../../../utils/checkSourse";

function Contact(props) {

    const dispatch = useDispatch()

    const msgPage = 'messages/';

    const userPage = 'users/'

    const loginTo = useSelector(state => state.messageReducer.receiver?.login)

    const messages = useSelector(state => state.messageReducer.messages)

    const loginFrom = useSelector(state => state.authReducer.login)

    const [messagesCount, setMessagesCount] = useState(0)

    const [subscribeState, setSubscribeState] = useState('')

    const { page, popupOption } = useSelector(state => state.appReducer)

    const clickHandler = () => {
        dispatch(setReceiver(props.contact.login))
        page === msgPage && dispatch(setReceiverMessageCount(props.contact.messages_count))
        if (props.contact.login != loginTo) {
            dispatch(getMessages(props.contact.login, loginFrom, 0, false, messagesCount > 50 ? messagesCount + 20 : 50, false))
        }
    }

    useEffect(() => {
        if (loginTo === props.contact.login && page === msgPage && !props.disabled) {
            dispatch(setReadMessages(loginTo, loginFrom))
        }
    }, [messages])

    useEffect(() => {
        loginTo !== props.contact.login
            ? setMessagesCount(props.contact.messages_count)
            : setMessagesCount(0)
    })
    const isAvatarExists = props.contact.avatar && checkSource(props.contact.avatar)

    return <div style={!props.navPanelIsVisible ? { width: 63 + 'px' } : {}} className={styles.contactBar}>
        <Link
            className={styles.contact}
            onClick={clickHandler}
            to={!props.disabled ? props.link : ""}
            style={props.navPanelIsVisible ? { width: props.width - 25 } : { width: props.width }}>
            <img
                src={isAvatarExists ? props.contact.avatar : userLogo}
                style={{
                    border: isAvatarExists ? '1px solid rgb(94, 182, 249)' : '',
                    width: isAvatarExists ? '46px' : '50px',
                    height: isAvatarExists ? '46px' : '50px',
                    minWidth: isAvatarExists ? '46px' : '50px',
                }}
                className={styles.icon}
            />
            <div className={styles.user}>
                {`${props.contact.firstname} ${props.contact.lastname[0]}.`}
                {
                    (props.onlineContacts.some(onlineContact => props.contact.login === onlineContact.login))
                        ? page === userPage && <div
                            key={v4()}
                            className={styles.online}>
                            В сети
                        </div>
                        : page === userPage && <div
                            key={v4()}
                            className={styles.online}>
                            {
                                props.contact.last_entrance
                                    ? 'Был(а) в сети ' + getTiming(Date.now() - props.contact.last_entrance)
                                    : props.contact.status
                            }
                        </div>
                }
                {
                    props.onlineContacts.map(onlineContact => (
                        page === msgPage && props.contact.login === onlineContact.login
                            ? <div
                                key={v4()}
                                className={styles.onlineDot}
                            />
                            : <div
                                style={{ width: props.width - 120 }}
                                key={v4()}
                                className={styles.online}>
                                {props.contact.last_message}
                            </div>
                    ))
                }
            </div>
            {
                page === msgPage && props.navPanelIsVisible && Boolean(props.contact.importance) && !props.disabled &&
                <div
                    className={styles.unreadCount}
                    style={{
                        display: messagesCount ? 'flex' : 'none',
                        backgroundColor: props.contact.importance == 4 ? 'red' : 'rgb(94, 182, 249)'
                    }}>
                    {messagesCount}
                </div>
            }
            {
                page === msgPage && !popupOption && props.contact.last_message &&
                <div className={styles.date}>{dateConvert(props.contact.sequence)}</div>
            }
        </Link >
        {
            props.navPanelIsVisible && <Subscription
                contact={props.contact}
                loginFrom={loginFrom}
                setSubscribeState={setSubscribeState}>
                {subscribeState}
            </Subscription>
        }
    </div >
}

export default Contact;