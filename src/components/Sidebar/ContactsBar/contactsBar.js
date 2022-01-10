import React, { useEffect, useState } from 'react';
import styles from './contactsBar.module.css';
import Contact from '../Contact/contact';
import { useDispatch, useSelector } from 'react-redux';
import userLogo from '../../../assets/imgs/user_icon2.png';
import messageLogo from '../../../assets/imgs/message_icon.png';
import settingsLogo from '../../../assets/imgs/settings_icon.png';
import SearchBar from '../SearchBar/searchBar';
import { getContacts } from '../../../redux/contactReducer';
import { Link } from 'react-router-dom';
import socket from '../../../socket';
import { url } from '../../../config';

function ContactList(props) {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contactReducer.contacts);
    const [location, setLocation] = useState(url + 'messages/')
    const [onlineContacts, setOnlineContacts] = useState([])

    const userLogin = useSelector(state => {
        return state.authReducer.login
    })

    useEffect(() => dispatch(getContacts(userLogin)), []);

    socket.on('online', (users) => setOnlineContacts(users))


    return <div className={styles.contactList}>
        <SearchBar navPanelIsVisible={props.navPanelIsVisible} userLogin={userLogin} />
        <div className={styles.contacts}>
            {
                contacts.length
                    ? contacts.map((contact, i) => <Contact
                        key={i}
                        contact={contact}
                        onlineContacts={onlineContacts}
                        link={location + contact.login} />)
                    : props.navPanelIsVisible &&
                    <div className={styles.noContacts}>
                        <p>Контактов нет</p>
                    </div>
            }
        </div>
        {
            props.navPanelIsVisible && <div className={styles.navPanel}>
                <Link to={url + 'users'}><img src={userLogo} className={styles.img} onClick={() => setLocation(url + 'users/')} /></Link>
                <Link to={url + 'messages'}><img src={messageLogo} className={styles.img} onClick={() => setLocation(url + 'messages/')} /></Link>
                <Link to={url + 'settings'}><img src={settingsLogo} className={styles.img} /></Link>
            </div>
        }
    </div>
}

export default ContactList;