import React, { useEffect, useState } from "react";
import Contact from "../Contact/contact";
import styles from "./contactSelect.module.css"
import RountCheckbox from "../../Common/RoundCheckbox/roundCheckbox";
import { useDispatch } from "react-redux";
import { setReadyData, setReadyPoint } from "../../../redux/actions";
import folderIcon from "./../../../assets/imgs/folder.png"

function ContactSelect({ contacts, onlineContacts, location, width, navPanelIsVisible }) {

    const dispatch = useDispatch()
    const [checkedContacts, setCheckedContacts] = useState([])
    const [displayPrompt, setDisplayPrompt] = useState(false)
    const [folderName, setFolderName] = useState('')
    const [data, setData] = useState([])

    const checkHandler = (el, isChecked) => {
        !isChecked
            ? setCheckedContacts(prevState => [...prevState, el.login])
            : setCheckedContacts(prevState => prevState.filter((contact) => contact != el.login))
    }

    const changeHandler = (e) => {
        setFolderName(e.target.value)
    }

    useEffect(() => {
        dispatch(setReadyData(data))
    }, [data])

    useEffect(() => {
        checkedContacts.length ? dispatch(setReadyPoint(true)) : dispatch(setReadyPoint(false))
        setData([{ folderName }, { contacts: checkedContacts }])
    }, [checkedContacts, folderName])

    return <div className={styles.selectWrapper}>
        <div className={styles.folderNameWrapper}>
            <img src={folderIcon} className={styles.folderImg} />
            <input
                value={folderName}
                onChange={changeHandler}
                className={styles.input}
                placeholder='Название папки'
            />
            <div
                className={styles.folderNameAlert}
                onMouseEnter={() => setDisplayPrompt(true)}
                onMouseLeave={() => setDisplayPrompt(false)}>
                *
            </div>
        </div>
        <div className={styles.folderPrompt} style={displayPrompt ? { display: 'block' } : { display: 'none' }}>
            Если название папки отсутствует, то контакт попадает в общий список
        </div>
        {
            contacts.map((contact, i) => (
                <div className={styles.selectedContact} key={i}>
                    <Contact
                        index={i}
                        contact={contact}
                        onlineContacts={onlineContacts}
                        link={location + contact.login}
                        location={location}
                        width={width}
                        navPanelIsVisible={navPanelIsVisible}
                    />
                    <div key={`${i}dsefsefq3`} className={styles.roundCheckbox}>
                        <RountCheckbox checkHandler={checkHandler} element={contact} />
                    </div>
                </div>
            ))
        }
    </div>
}

export default ContactSelect;