import styles from './message.module.css'
import React from 'react'
import userLogo from '../../../assets/imgs/user_icon.png';

function Message({ message, messages, index }) {
    return <div className={styles.main}>
        {
            (!(message.date?.substr(0, 10) == messages[index + 1]?.date?.substr(0, 10)) && message.date) &&
            <div className={styles.date} >
                {
                    `${messages[index]?.date?.substr(8, 2)}.${messages[index]?.date?.substr(5, 2)}.${messages[index]?.date?.substr(0, 4)} `
                }
            </div>
        }
        <div className={styles.message} >
            {
                (message.firstname != messages[index + 1]?.firstname) &&
                <img src={userLogo} className={styles.logo} />
            }
            <div className={styles.messageBlock}>
                {
                    (message.firstname != messages[index + 1]?.firstname) &&
                    <div className={styles.username}>{message.firstname}</div>
                }
                <li
                    className={styles.messageText}
                    style={(message.firstname == messages[index + 1]?.firstname)
                        ? { paddingLeft: '65px', paddingTop: 0 }
                        : {}}>
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
    </div>
}

export default Message;