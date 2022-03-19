import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authReducer";
import BackButton from "../Chat/BackButton/backButton";
import styles from './settings.module.css';
import { useWindowSize } from "../../customHooks/useWindowSize";
import { useState } from "react";
import ToggleSwitch from "./toggleButton/toggleButton";
import { UserAPI } from "../../api";
import Avatar from "./inputSettings/avatar";
import { getContacts } from "../../redux/contactReducer";
import Status from "./inputSettings/status";

export const Settings = (props) => {

    const dispatch = useDispatch();

    const login = useSelector(state => state.authReducer.login)

    const exitHandler = (e) => dispatch(logoutUser(login))

    const [width, height] = useWindowSize()

    const [isPrivate, setIsPrivate] = useState(false);

    const [avatar, setAvatar] = useState('');

    const [status, setStatus] = useState('');

    const userData = useSelector(state => state.authReducer.userData);

    useEffect(() => () => dispatch(getContacts(login)), [])

    useEffect(() => {
        if (userData?.is_private) {
            setIsPrivate(userData?.is_private)
        }
        setAvatar(userData?.avatar)
        setStatus(userData?.status)
    }, [userData])


    const privateHandler = () => {
        setIsPrivate(!isPrivate)
        UserAPI.setPrivate(login, !isPrivate ? 1 : 0)
    }

    return <div className={styles.settings}>
        {
            width < 700 && <BackButton />
        }
        <Avatar avatar={avatar} login={login} />
        <Status status={status} login={login} />
        <div className={styles.isPrivate}>
            Приватный аккаунт
            <ToggleSwitch
                size={70}
                isOn={isPrivate}
                onColor="#EF476F"
                handleToggle={() => privateHandler()}
            />
        </div>


        <button className={styles.button} onClick={exitHandler}>Выйти</button>
    </div>
}