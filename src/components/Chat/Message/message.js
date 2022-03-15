import styles from './message.module.css'
import React, { useEffect, useState } from 'react'
import userLogo from '../../../assets/imgs/user_icon.png';
import { useRef } from 'react';

function Message({ message, messages, index, loginTo }) {

    const myRef = useRef(null)

    useEffect(() => myRef.current?.scrollIntoView(), [loginTo, myRef])

    const showDate = !(message.date?.substr(0, 10) == messages[index + 1]?.date?.substr(0, 10)) && message.date;

    const isNewMessage = messages[index + 1]?.is_read == 1 && message.is_read == 0 && messages[0]?.sender_login === loginTo

    const repeatUserIcon = message.firstname != messages[index + 1]?.firstname

    return <div className={styles.main}>
        {
            showDate && <div className={styles.date} >
                {
                    `${messages[index]?.date?.substr(8, 2)}.${messages[index]?.date?.substr(5, 2)}.${messages[index]?.date?.substr(0, 4)} `
                }
            </div>
        }
        {
            isNewMessage && <div className={styles.newMessage} ref={myRef}>
                Новые сообщения
            </div>
        }
        <div className={styles.message} style={!message.is_read && message.sender_login !== loginTo ? { backgroundColor: 'rgb(214, 214, 214)' } : {}}>
            {
                repeatUserIcon && <img src={userLogo} className={styles.logo} />
            }
            <div className={styles.messageBlock}>
                {
                    repeatUserIcon && <div className={styles.username}>{message.firstname}</div>
                }
                <li
                    className={styles.messageText}
                    style={!repeatUserIcon ? { paddingLeft: '65px', paddingTop: 0 } : {}}>
                    {message.text}
                </li>
            </div>
            <div className={styles.time}>
                {
                    message.date
                        ? (message.date?.substr(11, 2) + message.date?.substr(13, 3))
                        : ('0' + new Date().getHours()).slice(-2) + ":" + ('0' + new Date().getMinutes()).slice(-2)
                }
            </div>
        </div>
    </div >
}

export default Message;