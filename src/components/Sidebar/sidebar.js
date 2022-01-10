import React, { useEffect, useState } from "react";
import ContactList from "./ContactsBar/contactsBar";
import DragPanel from "./DragPanel/dragPanel";
import styles from './sidebar.module.css'

function Sidebar(props) {
    let sidebarWidth = localStorage.getItem('sidebarWidth') ? localStorage.getItem('sidebarWidth') : 400
    const [state, setState] = useState({
        isDragging: false,
        width: sidebarWidth,
        navPanelIsVisible: true
    })


    const dragHandler = (e) => {

        if (e.pageX > 200) {
            setState(prevState => ({
                ...prevState, width: e.pageX, navPanelIsVisible: true
            }))
        } else if (e.pageX) {
            setState(prevState => ({
                ...prevState, width: 63, navPanelIsVisible: false
            }))
        }
    }
    useEffect(() => (
        setState(prevState => ({
            ...prevState, navPanelIsVisible: state.width < 200 ? false : true
        }))
    ), [])

    const dragStartHandler = (e) => {
        let pic = new Image()
        pic.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        e.dataTransfer.setDragImage(pic, 0, 0)
    }

    const mouseDownHandler = (e) => {
        setState(prevState => ({
            ...prevState, isDragging: true
        }))
    }

    const dragEndHandler = (e) => {
        localStorage.setItem('sidebarWidth', state.width);
        setState(prevState => ({
            ...prevState, isDragging: false
        }))

    }
    return <div className={styles.contactsBar} style={{ width: state.width + 'px' }}>
        <div className={styles.contactList}><ContactList navPanelIsVisible={state.navPanelIsVisible} /></div>
        <div
            className={styles.dragPanel}
            draggable={true}
            onDrag={dragHandler}
            onDragStart={dragStartHandler}
            onMouseDown={mouseDownHandler}
            onDragEnd={dragEndHandler}>
            <DragPanel />
        </div>
    </div>
}

export default Sidebar;