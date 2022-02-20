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
import { path } from '../../../config';
import { setPage, updateLeavingTime } from '../../../redux/actions';
import SidebarPopup from '../../Common/Popup/sidebarPopup';
import { useWindowSize } from '../../../customHooks/useWindowSize';


function ContactList(props) {
    const dispatch = useDispatch();

    const [onlineContacts, setOnlineContacts] = useState([])
    const [displayPopup, setDisplayPopup] = useState(false)

    const contacts = useSelector(state => state.contactReducer.contacts);

    const userLogin = useSelector(state => {
        return state.authReducer.login
    })

    const location = useSelector(state => {
        return state.appReducer.page
    })

    const page = useSelector(state => state.appReducer.page)

    useEffect(() => {
        dispatch(getContacts(userLogin))
        socket.on('online', (users) => setOnlineContacts(users))
        socket.on('exit', (user) => {
            dispatch(updateLeavingTime(user.user))
        })
    }, []);

    const pageHandler = (page) => {
        dispatch(setPage(page))
    }

    const popupDisplayHandler = () => {
        setDisplayPopup(!displayPopup)
    }

    const [width, height] = useWindowSize()

    return <div className={styles.contactList}>
        <SearchBar
            navPanelIsVisible={props.navPanelIsVisible}
            userLogin={userLogin}
            location={location}
            popupDisplayHandler={popupDisplayHandler}
        />

        {
            page === 'users/' &&
            <SidebarPopup
                content={[{ name: 'Удалить контакт' }]}
                displayPopup={displayPopup}
            />
        }

        <div className={styles.contacts} style={{ height: `${height - 95}px` }}>
            {
                !props.isDragging
                    ? contacts.length
                        ? contacts.map((contact, i) => <Contact
                            key={i}
                            index={i}
                            contact={contact}
                            onlineContacts={onlineContacts}
                            link={location + contact.login}
                            location={location}
                            width={props.width}
                            navPanelIsVisible={props.navPanelIsVisible} />)
                        : props.navPanelIsVisible &&
                        <div className={styles.noContacts}>
                            <p>Контактов нет</p>
                        </div>
                    : <div className={styles.noContacts}>
                        <p style={{ fontSize: '42px' }}>⇆</p>
                    </div>
            }
        </div>
        {
            props.navPanelIsVisible &&
            <div className={styles.navPanel}>
                <Link to={path + 'users'}>
                    <img
                        style={page === 'users/' ? { filter: 'contrast(180%)' } : {}}
                        src={userLogo}
                        className={styles.img}
                        onClick={() => pageHandler('users/')}
                    />
                </Link>
                <Link to={path + 'messages'}>
                    <img
                        style={page === 'messages/' ? { filter: 'contrast(180%)' } : {}}
                        src={messageLogo}
                        className={styles.img}
                        onClick={() => pageHandler('messages/')}
                    />
                </Link>
                <Link to={path + 'settings'}>
                    <img
                        style={page === 'settings/' ? { filter: 'contrast(180%)' } : {}}
                        src={settingsLogo}
                        className={styles.img}
                        onClick={() => pageHandler('settings/')}
                    />
                </Link>
            </div>
        }
    </div>
}


export default ContactList;