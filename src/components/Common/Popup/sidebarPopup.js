import React from "react";
import { useDispatch } from "react-redux";
import { setPopupOption } from "../../../redux/actions";
import styles from './sidebarPopup.module.css'

function SidebarPopup({ content, displayPopup, popupDisplayHandler }) {
    const dispatch = useDispatch()

    const clickHandler = (option) => {
        dispatch(setPopupOption(option))
        popupDisplayHandler()
    }
    return <div className={styles.sidebarPopup} style={displayPopup ? { display: 'block' } : { display: 'none' }} size={content.length}>
        {
            content.map((element, i) => (
                <div className={styles.popupItem} key={i} onClick={() => clickHandler(element.option)}>{element.name} </div>
            ))
        }
    </div>
}


export default SidebarPopup