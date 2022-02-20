import React, { useEffect, useState } from "react";
import styles from "./contact.module.css"
import userLogo from '../../../assets/imgs/user_icon.png';
import subscribeUser from '../../../assets/imgs/user-subscribe-icon.png';
import unsubscribeUser from '../../../assets/imgs/user-unsubscribe-icon.png';
import subscribedUser from '../../../assets/imgs/user-subscribed-icon.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReceiver } from "../../../redux/messageReducer";
import { getMessages, setReadMessages } from "../../../redux/messageReducer";
import { MessageAPI, UserAPI } from "../../../api";
import { getTiming } from "../../../utils/timing";
import { setUserSubscription } from "../../../redux/actions";
import { getContacts } from "../../../redux/contactReducer";


function Contact(props) {

    const dispatch = useDispatch()

    const [messagesCount, setMessagesCount] = useState(0)

    const [isSubscribed, setSubscribe] = useState(false)

    const [subscription, setSubscription] = useState(true)

    const loginTo = useSelector(state => {
        return state.messageReducer.receiver?.login
    })
    const loginFrom = useSelector(state => {
        return state.authReducer.login
    })

    useEffect(() => {
        setSubscribe(false)
        MessageAPI.getUnreadMessagesCount(props.contact.login, loginFrom).then(data => {
            if (!data[0].sender_login) data[0].sender_login = loginFrom
            props.contact.login == loginTo ? setMessagesCount(0) : setMessagesCount(data[0].count)
            props.contact.login == loginTo && dispatch(setReadMessages(props.contact.login, loginFrom))
        })
        UserAPI.checkSubscription(loginFrom, props.contact.login).then(data => {
            setSubscription(data?.subscription);
            (data?.subscription === true || data?.subscription === loginFrom) && setSubscribe(true)
        })
    }, [props.contact])


    const subscribeHandler = (isUnsubscribe) => {
        subscription !== loginFrom && !isSubscribed && !isUnsubscribe
            ? UserAPI.subscribe(loginFrom, props.contact.login).then(data => {
                setSubscribe(data)
            })
            : (subscription === false || isUnsubscribe || subscription === loginFrom) && UserAPI.unsubscribe(loginFrom, props.contact.login).then(data => {
                setSubscribe(data)
                setSubscription(data)
            })
        dispatch(getContacts(loginFrom))
    }
    const toShowUnsubscribeIcon = (subscription === false || subscription === loginFrom) && isSubscribed

    const clickHandler = () => {
        dispatch(setUserSubscription(subscription))
        setMessagesCount(0)
        dispatch(setReceiver(props.contact.login))
        props.contact.login != loginTo && dispatch(getMessages(props.contact.login, loginFrom, 0, false))
    }

    return <div style={!props.navPanelIsVisible ? { width: 63 + 'px' } : {}} className={styles.contactBar}>
        <Link className={styles.contact} onClick={clickHandler} to={props.link} style={{ width: props.width - 120 }}>
            <img src={userLogo} className={styles.icon} />
            <div className={styles.user}>
                {`${props.contact.firstname} ${props.contact.lastname[0]}.`}
                {
                    (props.onlineContacts.some(onlineContact => props.contact.login === onlineContact.login))
                        ? props.location === 'users/' &&
                        <div
                            key={`${props.index}dafrfsf`}
                            className={styles.online}>
                            В сети
                        </div>
                        : props.location === 'users/' &&
                        <div
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
                            ? < div
                                key={`${i}_onln`}
                                className={styles.onlineDot}
                            />
                            : <div
                                style={{ width: props.width - 200 }}
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
                    style={!messagesCount
                        ? { display: 'none' }
                        : { display: 'block' }}>
                    {messagesCount}
                </div>
            }
            {
                props.contact.is_private === 1 && props.location === 'users/' && props.navPanelIsVisible &&
                <img
                    src={subscription === loginFrom || isSubscribed
                        ? subscribedUser
                        : subscribeUser}
                    style={subscription === true
                        ? { display: 'none' }
                        : subscription !== loginFrom && subscription !== false
                            ? { right: '55px' }
                            : {}}
                    onMouseOver={e => (toShowUnsubscribeIcon) ? e.currentTarget.src = unsubscribeUser : ''}
                    onMouseOut={e => (toShowUnsubscribeIcon) ? e.currentTarget.src = subscribedUser : ''}
                    className={styles.subscribe}
                    onClick={() => subscribeHandler(false)}
                />
            }
            {
                props.navPanelIsVisible && props.location === 'users/' && subscription !== loginFrom && subscription !== false &&
                <img
                    src={unsubscribeUser}
                    className={styles.subscribe}
                    onClick={() => subscribeHandler(true)}
                />
            }
        </Link>
    </div>
}

export default Contact;