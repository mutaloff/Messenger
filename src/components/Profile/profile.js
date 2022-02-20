import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './profile.module.css'
import userLogo from '../../assets/imgs/user_icon.png'

const Profile = (props) => {
    const { login } = useParams();
    const contacts = useSelector(state => state.contactReducer.contacts);

    return <div className={styles.profileWindow}>
        {
            contacts.map((contact, i) => (
                contact.login === login &&
                <div className={styles.profile} key={i}>
                    <img src={userLogo} className={styles.img} />
                    <div className={styles.info}>
                        <div className={styles.titles}>
                            <h3>Логин:  </h3>
                            <h3>Имя:  </h3>
                            <h3>Фамилия:</h3>
                        </div>
                        <div>
                            <h3>{contact.login}</h3>
                            <h3>{contact.firstname}</h3>
                            <h3>{contact.lastname}</h3>
                        </div>
                    </div>
                </div>
            ))
        }
    </div >
}

export default Profile;