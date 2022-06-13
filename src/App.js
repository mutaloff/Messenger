import React, { useEffect } from "react";
import Chat from "./components/Chat/chat";
import Sidebar from "./components/Sidebar/sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./components/Authorization/signup";
import { Signin } from "./components/Authorization/signin";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "./components/Settings/settings";
import styles from './styles/app.module.css'
import { checkAuth, getUser } from "./redux/authReducer";
import { Absence } from "./components/Chat/Absence/absence";
import Profile from "./components/Profile/profile";
import socket from "./socket";
import messageSound from './../src/assets/sounds/message-sound.mp3'
import { getUserAssignment, sendAssignment, sendMessage } from "./redux/actions";
import { getContacts } from "./redux/contactReducer";
import Calendar from "./components/Calendar/calendar";

function App() {

    let { isAuth, login } = useSelector(state => state.authReducer)

    const soundEffect = new Audio();

    soundEffect.src = messageSound;

    const receiver = useSelector(state => state.messageReducer.receiver)

    const page = useSelector(state => state.appReducer.page)

    const { contacts } = useSelector(state => state.contactReducer)

    let dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            socket.emit('enter', login)
            socket.emit('getOnline')
            socket.off('getMessage')
            socket.on('getMessage', data => {
                console.log(contacts.filter(contact => contact.login === data.sender_login)[0].importance)
                if (contacts.filter(contact => contact.login === data.sender_login)[0].importance != 0) {
                    soundEffect.play();
                }
                dispatch(sendMessage(data))
                dispatch(sendAssignment(data))
                setTimeout(() => dispatch(getContacts(login)), 50)
                if (data.sender_login === receiver?.login) {
                    socket.emit('readMessage', login, receiver?.login)
                }
            })
        }
    })
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            dispatch(checkAuth())
        }
        if (!isAuth) {
            localStorage.removeItem('jwt')
        }
    }, [])


    return <div>
        {
            isAuth && login
                ? <div className={styles.app}>
                    <Sidebar />
                    <Routes>
                        <Route path={'*'} element={<Navigate replace to={page} />} />
                        <Route path={'messages/:login'} element={<Chat />} />
                        <Route path={'settings'} element={<Settings />} />
                        <Route path={'calendar'} element={<Calendar />} />
                        <Route path={'messages'} element={<Absence text='Выберите чат, чтобы начать переписку' />} />
                        <Route path={'users'} element={<Absence text='Выберите контакт, чтобы посмотреть профиль' />} />
                        <Route path={'users/:login'} element={<Profile />} />
                    </Routes>
                </div>
                : <Routes>
                    <Route path={'*'} element={!localStorage.getItem('jwt') && <Navigate replace to={'login'} />} />
                    <Route path={'login'} element={<Signin />} />
                    <Route path={'signup'} element={<Signup />} />
                </Routes >
        }
    </div>
}

export default App;