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

function Contact(props) {

    const dispatch = useDispatch()

    const loginTo = useSelector(state => state.messageReducer.receiver?.login)

    const messages = useSelector(state => state.messageReducer.messages)

    const loginFrom = useSelector(state => state.authReducer.login)

    const [messagesCount, setMessagesCount] = useState(0)

    const [subscribeState, setSubscribeState] = useState('')

    const clickHandler = () => {
        dispatch(setReceiver(props.contact.login))
        dispatch(setReceiverMessageCount(props.contact.messages_count))
        props.contact.login != loginTo &&
            dispatch(getMessages(props.contact.login, loginFrom, 0, false, messagesCount > 50 ? messagesCount + 20 : 50))
    }

    useEffect(() => {
        if (loginTo === props.contact.login) {
            dispatch(setReadMessages(loginTo, loginFrom))
        }
    }, [messages])

    useEffect(() => {
        loginTo !== props.contact.login
            ? setMessagesCount(props.contact.messages_count)
            : setMessagesCount(0)
    })

    return <div style={!props.navPanelIsVisible ? { width: 63 + 'px' } : {}} className={styles.contactBar}>
        <Link className={styles.contact} onClick={clickHandler} to={props.link} style={{ width: props.width - 20 }}>
            <img src={userLogo} className={styles.icon} />
            <div className={styles.user}>
                {`${props.contact.firstname} ${props.contact.lastname[0]}.`}
                {
                    (props.onlineContacts.some(onlineContact => props.contact.login === onlineContact.login))
                        ? props.location === 'users/' && <div
                            key={`${props.index}dafrfsf`}
                            className={styles.online}>
                            В сети
                        </div>
                        : props.location === 'users/' && <div
                            key={`${props.index}kkmndipawndiaw`}
                            className={styles.online}>
                            {
                                props.contact.last_entrance
                                    ? 'Был(а) в сети ' + getTiming(Date.now() - props.contact.last_entrance)
                                    : props.contact.status
                            }
                        </div>
                }
                {
                    props.onlineContacts.map((onlineContact, i) => (
                        props.location === 'messages/' && props.contact.login === onlineContact.login
                            ? <div
                                key={`${i}_onln`}
                                className={styles.onlineDot}
                            />
                            : <div
                                style={{ width: props.width - 120 }}
                                key={`${i}_wfefefgsefa`}
                                className={styles.online}>
                                {props.contact.last_message}
                            </div>
                    ))
                }
            </div>
            {
                props.location === 'messages/' && props.navPanelIsVisible && <div
                    className={styles.unreadCount}
                    style={!messagesCount ? { display: 'none' } : { display: 'block' }}>
                    {messagesCount}
                </div>
            }
        </Link>
        {
            props.navPanelIsVisible && <Subscription
                contact={props.contact}
                loginFrom={loginFrom}
                setSubscribeState={setSubscribeState}>
                {subscribeState}
            </Subscription>
        }
    </div>
}

export default Contact;