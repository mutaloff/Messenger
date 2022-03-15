import React, { useEffect, useState } from "react";
import styles from "./grouping.module.css"
import Contact from "../Contact/contact";
import folderIcon from "./../../../assets/imgs/folder.png";
import sendFolderIcon from "./../../../assets/imgs/send_folder.png";
import sendMessageIcon from "./../../../assets/imgs/send_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/messageReducer";
import socket from "../../../socket";
import { sendMessage } from "../../../redux/actions";
import { keyPress } from "../../../utils/keyPress";

const Grouping = ({ contacts, onlineContacts, location, width, navPanelIsVisible, userLogin }) => {

    const dispatch = useDispatch()

    const folder = Object.keys(contacts)[0]

    const [displayFolder, setDisplayFolder] = useState(JSON.parse(sessionStorage.getItem(folder)) ? true : false)

    const [displayInput, setDisplayInput] = useState(false)

    const [text, setText] = useState('')

    const [messagesCount, setMessagesCount] = useState(0)

    const receiver = useSelector(state => state.messageReducer.receiver)

    const revealHandler = (e) => {
        setDisplayFolder(!displayFolder)
        sessionStorage.setItem(folder, !displayFolder)
    }

    const showInputHandler = (e) => {
        setDisplayInput(!displayInput)
    }

    const changeHandler = (e) => {
        setText(e.target.value)
    }

    const sendHandler = (e) => {
        text.length && dispatch(setMessage(userLogin, contacts[folder].map(contact => contact.login), text))
        for (let contact of contacts[folder]) {
            let sender_login = userLogin;
            let receiver_login = contact.login
            let firstname = contact.firstname
            text.length && socket.emit('sendMessage', { sender_login, receiver_login, text, firstname });
            text.length && dispatch(sendMessage({ sender_login, receiver_login, text, firstname }));
        }
        text.length && setText('')
        text.length && setDisplayInput(!displayInput)
    }

    useEffect(() => {
        setMessagesCount(0)
        contacts[folder].map(contact => {
            if (receiver?.login !== contact.login) {
                setMessagesCount(prevState => prevState + contact.messages_count)
            }
        })
    }, [contacts])

    return <div className={styles.grouping}>
        <div className={styles.folder}>
            <img src={folderIcon} className={styles.folderIcon} onClick={revealHandler} />
            <div className={styles.folderName} onClick={revealHandler}>{folder}</div>
            <div className={styles.messageBox} style={displayInput ? { display: 'flex' } : { display: 'none' }}>
                <input
                    value={text}
                    onKeyPress={(e) => keyPress(e, sendHandler)}
                    className={styles.messageInput}
                    onChange={changeHandler}
                    placeholder='Введите сообщение'>
                </input>
                <img src={sendMessageIcon} className={styles.sendMessage} onClick={sendHandler} />
            </div>
            <img src={sendFolderIcon} className={styles.sendFolder} onClick={showInputHandler} />
            <div
                style={messagesCount ? { display: 'flex' } : { display: 'none' }}
                className={styles.messagesСount}>
                {messagesCount}
            </div>
            <div className={styles.folderArrow} onClick={revealHandler}>{`${displayFolder ? '▼' : '►'}`}</div>
        </div>
        <div style={displayFolder ? { display: 'flex' } : { display: 'none' }} className={styles.folderElements}>
            {
                contacts[folder].map((contact, i) => (
                    <div className={styles.folderContact} key={i}>
                        <Contact
                            index={i}
                            contact={contact}
                            onlineContacts={onlineContacts}
                            link={location + contact.login}
                            location={location}
                            width={width}
                            navPanelIsVisible={navPanelIsVisible}
                        />
                    </div>
                ))
            }
        </div>
    </div>
}

export default Grouping;