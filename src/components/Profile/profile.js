import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './profile.module.css'
import { v4 } from "uuid";
import BackButton from "../Chat/BackButton/backButton";
import { useWindowSize } from "../../customHooks/useWindowSize";

import UserPage from "./userPage/userPage";

const Profile = (props) => {
    const { login } = useParams();

    const contacts = useSelector(state => state.contactReducer.contacts);

    const [width, height] = useWindowSize()

    return <div className={styles.profileWindow}>
        {
            width < 700 && <BackButton />
        }
        <>
            {
                contacts.map((contact, i) => (
                    contact.login === login &&
                    <UserPage contact={contact} key={v4()} />
                ))
            }
        </>
    </div>
}

export default Profile;