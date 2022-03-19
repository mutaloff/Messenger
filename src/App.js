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
import { sendMessage } from "./redux/actions";
import { getContacts } from "./redux/contactReducer";

function App() {
    let { isAuth, login } = useSelector(state => state.authReducer)

    const soundEffect = new Audio();

    soundEffect.src = messageSound;

    const receiver = useSelector(state => state.messageReducer.receiver)

    let dispatch = useDispatch()


    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            socket.emit('enter', login)
            socket.emit('getOnline')
            socket.off('getMessage')
            socket.on('getMessage', data => {
                soundEffect.play();
                dispatch(sendMessage(data))
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
                        <Route path={'*'} element={<Navigate replace to={'messages'} />} />
                        <Route path={'messages/:login'} element={<Chat />} />
                        <Route path={'settings'} element={<Settings />} />
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