import React, { useEffect } from "react";
import Chat from "./components/Chat/chat";
import Sidebar from "./components/Sidebar/sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./components/Authorization/signup";
import { Signin } from "./components/Authorization/signin";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "./components/Settings/settings";
import styles from './styles/app.module.css'
import { checkAuth } from "./redux/authReducer";
import { Absence } from "./components/Chat/Absence/absence";
import Profile from "./components/Profile/profile";
import socket from "./socket";
import { url } from "./config"


function App() {
    let { isAuth, login } = useSelector(state => state.authReducer)
    let dispatch = useDispatch()
    console.log('started')
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            dispatch(checkAuth())
        }
        if (!isAuth) {
            localStorage.removeItem('jwt')
        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            socket.emit('enter', login)
            socket.emit('getOnline')
        }
    })

    return <div>
        {
            isAuth && login
                ? <div className={styles.app}>
                    <Sidebar />
                    <Routes>
                        <Route path={'*'} element={<Navigate replace to={url + 'messages'} />} />
                        <Route path={url + 'messages/:login'} element={<Chat />} />
                        <Route path={url + 'settings'} element={<Settings />} />
                        <Route path={url + 'messages'} element={<Absence text='Выберите чат, чтобы начать переписку' />} />
                        <Route path={url + 'users'} element={<Absence text='Выберите контакт' />} />
                        <Route path={url + 'users/:login'} element={<Profile />} />
                    </Routes>
                </div>
                : <Routes>
                    <Route path={'*'} element={!localStorage.getItem('jwt') && <Navigate replace to={url + 'login'} />} />
                    <Route path={url + 'login'} element={<Signin />} />
                    <Route path={url + 'signup'} element={<Signup />} />
                </Routes >
        }
    </div>

}


export default App;