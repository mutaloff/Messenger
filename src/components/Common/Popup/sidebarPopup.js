import React from "react";
import styles from './sidebarPopup.module.css'

function SidebarPopup({ content, displayPopup }) {

    return <div className={styles.sidebarPopup} style={displayPopup ? { display: 'block' } : { display: 'none' }} size={content.length}>
        {
            content.map((element, i) => (
                <div className={styles.popupItem} key={i}>{element.name}</div>
            ))
        }
    </div>
}


export default SidebarPopup