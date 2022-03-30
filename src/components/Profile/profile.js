import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from './profile.module.css'
import BackButton from "../Chat/BackButton/backButton";
import { useWindowSize } from "../../customHooks/useWindowSize";
import UserPage from "./userPage/userPage";
import { setCurrentReceiver } from "../../redux/actions";
import { setReceiver } from "../../redux/messageReducer";

const Profile = (props) => {

    const { login } = useParams();

    const contacts = useSelector(state => state.contactReducer.contacts);

    const [width, height] = useWindowSize()

    const dispatch = useDispatch()

    useEffect(() => dispatch(setReceiver(login)), [])

    return <div className={styles.profileWindow}>
        {
            width < 700 && <div><BackButton /></div>
        }
        <>
            {
                contacts.map((contact, i) => (
                    contact.login === login &&
                    <UserPage contact={contact} key={i} />
                ))
            }
        </>
    </div>
}

export default Profile;