import React, { useEffect } from "react";
import styles from "./contact.module.css"
import userLogo from '../../../assets/imgs/user_icon.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentReceiver } from "../../../redux/actions";
import { getMessages } from "../../../redux/messageReducer";

function Contact(props) {
    const dispatch = useDispatch()

    const loginTo = useSelector(state => {
        return state.messageReducer.receiver
    })
    const loginFrom = useSelector(state => {
        return state.authReducer.login
    })
    useEffect(() => {
        if (loginTo) {
            dispatch(getMessages(loginFrom, loginTo))
        }
    })
    const clickHandler = () => {
        dispatch(setCurrentReceiver(props.contact.login))
    }
    return <Link to={props.link} className={styles.link}>
        <div className={styles.contact} onClick={clickHandler}>
            <img src={userLogo} className={styles.icon} />
            <div className={styles.user}>
                {props.contact.firstname}
                {
                    props.onlineContacts.map((onlineContact, i) => (
                        props.contact.login === onlineContact.login &&
                        <div key={i} className={styles.online}>Online</div>
                    ))
                }
            </div>

        </div>
    </Link>
}

export default Contact;