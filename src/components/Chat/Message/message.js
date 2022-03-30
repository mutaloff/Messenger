import styles from './message.module.css'
import React, { useEffect, useState } from 'react'
import userLogo from '../../../assets/imgs/user_icon.png';
import { useRef } from 'react';
import { checkSource } from '../../../utils/checkSourse';
import RountCheckbox from '../../Common/RoundCheckbox/roundCheckbox';
import { setReadyData } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isURL } from '../../../utils/isUrl';
import { Link } from 'react-router-dom';

function Message({ message, messages, index, loginTo, userData, receiverData, showCheck, setShowCheck }) {

    const myRef = useRef(null)

    const dispatch = useDispatch()

    const [avatar, setAvatar] = useState(null)

    const [isChecked, setIsChecked] = useState(false)

    const showDate = !(message.date?.substr(0, 10) == messages[index + 1]?.date?.substr(0, 10)) && message.date;

    const isNewMessage = messages[index + 1]?.is_read == 1 && message.is_read == 0 && messages[0]?.sender_login === loginTo && !messages[index + 1]?.email

    const repeatUserIcon = message.firstname != messages[index + 1]?.firstname

    const hasReceiver = (receiverData?.login == message.login || receiverData?.login == message.sender_login) && checkSource(receiverData?.avatar) && receiverData

    const hasUser = (userData?.login == message.login || userData?.login == message.sender_login) && checkSource(userData?.avatar) && userData

    const readyData = useSelector(state => state.appReducer.readyData)

    useEffect(() => myRef.current?.scrollIntoView(), [loginTo, myRef])

    useEffect(() => {
        if (hasReceiver) {
            setAvatar(receiverData.avatar)
        } else if (hasUser) {
            setAvatar(userData.avatar)
        } else {
            setAvatar(userLogo)
        }
    }, [messages])

    useEffect(() => {
        if (isChecked) {
            setIsChecked(false)
        }
    }, [showCheck])

    const clickHandler = (e) => {
        setShowCheck(!showCheck)
    }

    const checkHandler = (e) => {
        setIsChecked(!isChecked)
        !isChecked
            ? dispatch(setReadyData(readyData ? [...readyData, message.id] : [message.id]))
            : dispatch(setReadyData(readyData.filter(data => data != message.id)))
    }



    return <div className={styles.main}>
        {
            showDate && <div className={styles.date}>
                {
                    `${messages[index]?.date?.substr(8, 2)}.${messages[index]?.date?.substr(5, 2)}.${messages[index]?.date?.substr(0, 4)} `
                }
            </div>
        }
        <div className={styles.newMessage} ref={myRef} style={{ display: isNewMessage ? 'flex' : 'none' }}>
            Новые сообщения
        </div>
        <div className={styles.message} style={{
            backgroundColor: isChecked ? 'gray' : !message.is_read && message.sender_login !== loginTo ? 'rgb(214, 214, 214)' : '',
        }}>
            {
                (repeatUserIcon || message.email || showDate) && <img src={avatar} className={styles.logo} />
            }
            <div className={styles.messageBlock} style={{ width: repeatUserIcon ? 'calc(100% - 50px)' : '100%' }} onDoubleClick={clickHandler}>
                {
                    (repeatUserIcon || message.email || showDate) && <div className={styles.username}>{`${message.firstname}   ${message.email ? '📧' : ''}`}</div>
                }
                {
                    isURL(message.text)
                        ? <a
                            style={message.email || showDate ? {} : !repeatUserIcon ? { paddingLeft: '65px', paddingTop: 0 } : {}}
                            href={message.text} target="_blank"
                            className={styles.messageText}>{message.text}
                        </a>
                        : <div
                            className={styles.messageText}
                            style={message.email || showDate ? {} : !repeatUserIcon ? { paddingLeft: '65px', paddingTop: 0 } : {}}>
                            {message.text}
                        </div>
                }

            </div>
            <div className={styles.time}>
                {
                    message.date
                        ? (message.date?.substr(11, 2) + message.date?.substr(13, 3))
                        : ('0' + new Date().getHours()).slice(-2) + ":" + ('0' + new Date().getMinutes()).slice(-2)
                }
            </div>
            <div >
                <div className={styles.roundCheckbox} style={{ display: showCheck ? 'flex' : 'none' }}>
                    <RountCheckbox element={message} checkHandler={checkHandler} uncheck={!isChecked} />
                </div>
            </div>
        </div>
    </div>
}

export default Message;