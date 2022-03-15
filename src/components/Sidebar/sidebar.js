import React, { useEffect, useMemo, useState } from "react";
import ContactList from "./ContactsBar/contactsBar";
import DragPanel from "./DragPanel/dragPanel";
import styles from './sidebar.module.css';
import { useWindowSize } from "../../customHooks/useWindowSize";
import { useSelector } from "react-redux";

function Sidebar(props) {
    let sidebarWidth = localStorage.getItem('sidebarWidth') ? localStorage.getItem('sidebarWidth') : 400;

    const [width, height] = useWindowSize()

    const [state, setState] = useState({
        isDragging: false,
        width: sidebarWidth,
        navPanelIsVisible: true
    })

    const location = useSelector(state => state.appReducer.page)

    const receiver = useSelector(state => state.messageReducer.receiver)

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
        if (state.width > 0.7 * window.innerWidth) {
            setState(prevState => ({
                ...prevState, width: 0.7 * window.innerWidth, navPanelIsVisible: true
            }))
        }
    }
    useEffect(() => {
        setState(prevState => ({
            ...prevState, navPanelIsVisible: state.width < 250 ? false : true
        }))
    }, [])

    useEffect(() => {
        if (location === 'settings/' && width < 700) {
            setState(prevState => ({
                ...prevState, width: 0, navPanelIsVisible: false
            }))
        } else {
            setState(prevState => ({
                ...prevState, width: sidebarWidth, navPanelIsVisible: sidebarWidth < 250 ? false : true
            }))
        }
    }, [width, location])


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

    return <div className={styles.contactsBar}
        style={state.width < 0.7 * window.innerWidth
            ? { minWidth: state.width + 'px', width: state.width + 'px' }
            : width > 700
                ? { minWidth: 0.7 * window.innerWidth + 'px', width: 0.7 * window.innerWidth + 'px' }
                : receiver
                    ? { display: 'none' }
                    : { width: '100%', minWidth: '100%' }}>

        <div className={styles.contactList}>
            {
                <ContactList
                    navPanelIsVisible={state.navPanelIsVisible}
                    isDragging={state.isDragging}
                    width={state.width}
                />
            }
        </div>
        <div
            className={styles.dragPanel}
            draggable={true}
            onDrag={dragHandler}
            onDragStart={dragStartHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={dragEndHandler}
            onDragEnd={dragEndHandler}>
            <DragPanel />
        </div>
    </div >
}


export default Sidebar;