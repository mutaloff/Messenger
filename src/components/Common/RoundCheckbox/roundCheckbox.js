import React, { useEffect, useState } from "react";
import styles from './roundCheckbox.module.css'

const RountCheckbox = ({ checkHandler, element, uncheck }) => {
    const [isChecked, setIsChecked] = useState(false)

    const clickHandler = (e) => {
        setIsChecked(!isChecked)
        checkHandler(element, isChecked)
    }
    useEffect(() => uncheck && setIsChecked(false), [uncheck])

    return <div className={styles.round} onClick={clickHandler}>
        <input type="checkbox" checked={isChecked} onChange={clickHandler} />
        <label htmlFor="checkbox"></label>
    </div>
}

export default RountCheckbox;