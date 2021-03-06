import React, { useEffect, useState } from 'react';
import styles from './contactsBar.module.css';
import Contact from '../Contact/contact';
import { useDispatch, useSelector } from 'react-redux';
import userLogo from '../../../assets/imgs/user_icon2.png';
import messageLogo from '../../../assets/imgs/message_icon.png';
import calendarLogo from '../../../assets/imgs/calendar_icon.png';
import settingsLogo from '../../../assets/imgs/settings_icon.png';
import SearchBar from '../SearchBar/searchBar';
import { getContacts } from '../../../redux/contactReducer';
import { Link } from 'react-router-dom';
import socket from '../../../socket';
import { setPage, updateLeavingTime } from '../../../redux/actions';
import { useWindowSize } from '../../../customHooks/useWindowSize';
import Loader from '../../Common/Loader/loader';
import settingLoaderIcon from './../../../assets/imgs/setting-loader.gif'
import Grouping from '../Grouping/grouping';
import { sortContacts } from '../../../utils/sortContacts';
import ContactSelect from '../ContactSelect/contactSelect';
import SidebarPopup from '../../Common/Popup/SidebarPopup/sidebarPopup';
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";


function ContactList(props) {

    const dispatch = useDispatch();

    const [onlineContacts, setOnlineContacts] = useState([])

    const [displayPopup, setDisplayPopup] = useState(false)

    const contacts = useSelector(state => state.contactReducer.contacts);

    const userLogin = useSelector(state => state.authReducer.login)

    const location = useSelector(state => state.appReducer.page)

    const page = useSelector(state => state.appReducer.page)

    const popupOption = useSelector(state => state.appReducer.popupOption)

    useEffect(() => {
        dispatch(getContacts(userLogin))
        socket.on('online', (users) => setOnlineContacts(users))
        socket.on('exit', (user) => {
            dispatch(updateLeavingTime(user.user))
        })
    }, []);

    const pageHandler = (newPage) => {
        dispatch(setPage(newPage))
    }

    const popupDisplayHandler = () => {
        setDisplayPopup(!displayPopup)
    }

    const [width, height] = useWindowSize()

    return <div >
        {
            page === 'settings/'
                ? <div style={{ height: `${height - 51}px` }}>
                    <Loader
                        source={settingLoaderIcon}
                        size={props.navPanelIsVisible ? 200 : 40}
                    />
                </div>
                : page === 'calendar/'
                    ? <div style={{ height: `${height - 51}px`, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <DayPilotNavigator
                            width={1}
                            selectMode={"week"}
                            showMonths={3}
                            skipMonths={3}
                            startDate={Date.now()}
                            selectionDay={Date.now()}

                        />
                    </div>
                    : <div>
                        {
                            props.navPanelIsVisible && <SearchBar
                                userLogin={userLogin}
                                location={location}
                                popupDisplayHandler={popupDisplayHandler}
                            />
                        }

                        <div className={styles.contacts} style={{ height: `${height - 95}px`, }}>
                            {
                                page === 'users/' &&
                                <SidebarPopup
                                    popupDisplayHandler={popupDisplayHandler}
                                    content={[{ name: '?????????????? ??????????????', option: 'deleteContact' }]}
                                    displayPopup={displayPopup}
                                />
                            }
                            {
                                page === 'messages/' &&
                                <SidebarPopup
                                    popupDisplayHandler={popupDisplayHandler}
                                    content={[{ name: '?????????????? ??????????', option: 'createFolder' }]}
                                    displayPopup={displayPopup}
                                />
                            }
                            {
                                !props.isDragging
                                    ? contacts.length
                                        ? popupOption == 'createFolder' && page === 'messages/'
                                            ? <ContactSelect
                                                contacts={contacts}
                                                onlineContacts={onlineContacts}
                                                location={location}
                                                width={props.width}
                                                navPanelIsVisible={props.navPanelIsVisible}
                                            />
                                            : sortContacts(contacts, page, props.navPanelIsVisible).map((contact, i) => (
                                                Object.keys(contact).length == 1
                                                    ? <Grouping
                                                        userLogin={userLogin}
                                                        contacts={contact}
                                                        key={i}
                                                        onlineContacts={onlineContacts}
                                                        location={location}
                                                        width={props.width}
                                                        navPanelIsVisible={props.navPanelIsVisible}
                                                    />
                                                    : <Contact
                                                        key={i}
                                                        index={i}
                                                        contact={contact}
                                                        onlineContacts={onlineContacts}
                                                        link={location + contact.login}
                                                        width={props.width}
                                                        navPanelIsVisible={props.navPanelIsVisible}
                                                    />
                                            ))
                                        : props.navPanelIsVisible &&
                                        <div className={styles.noContacts}>
                                            <p>?????????????????? ??????</p>
                                        </div>
                                    : <div className={styles.noContacts}>
                                        <p style={{ fontSize: '42px' }}>???</p>
                                    </div>
                            }
                        </div>
                    </div>
        }
        {
            props.navPanelIsVisible &&
            <div className={styles.navPanel}>
                <Link to={'users'}>
                    <img
                        style={page === 'users/' ? { filter: 'contrast(180%)' } : {}}
                        src={userLogo}
                        className={styles.img}
                        onClick={() => pageHandler('users/')}
                    />
                </Link>
                <Link to={'messages'}>
                    <img
                        style={page === 'messages/' ? { filter: 'contrast(180%)' } : {}}
                        src={messageLogo}
                        className={styles.img}
                        onClick={() => pageHandler('messages/')}
                    />
                </Link>
                <Link to={'calendar'}>
                    <img
                        style={page === 'calendar/' ? { filter: 'contrast(180%)' } : {}}
                        src={calendarLogo}
                        className={styles.img}
                        onClick={() => pageHandler('calendar/')}
                    />
                </Link>
                <Link to={'settings'}>
                    <img
                        style={page === 'settings/' ? { filter: 'contrast(180%)' } : {}}
                        src={settingsLogo}
                        className={styles.img}
                        onClick={() => pageHandler('settings/')}
                    />
                </Link>
            </div>
        }
    </div >
}


export default ContactList;