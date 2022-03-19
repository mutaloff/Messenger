import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPopupOption } from "../../../redux/actions";
import styles from './sidebarPopup.module.css';
import { v4 } from 'uuid';
import { useRef } from "react";


function SidebarPopup({ content, displayPopup, popupDisplayHandler }) {

    const dispatch = useDispatch()

    const editRef = useRef(null);

    const clickHandler = (option) => {
        dispatch(setPopupOption(option))
        popupDisplayHandler()
    }
    function outsideClickHandler(e) {
        if (editRef.current && !editRef.current.contains(e.target)) {
            popupDisplayHandler()
        }
        document.removeEventListener("mousedown", outsideClickHandler);
    }

    useEffect(() => {
        if (displayPopup) {
            document.addEventListener("mousedown", outsideClickHandler)
        }
    }, [displayPopup])

    return <div
        className={styles.sidebarPopup}
        style={{ display: displayPopup ? 'block' : 'none' }}
        ref={editRef}
        size={content.length}>
        {
            content.map((element, i) => (
                <div className={styles.popupItem} key={v4()} onClick={() => clickHandler(element.option)}>{element.name} </div>
            ))
        }
    </div>
}

export default SidebarPopup