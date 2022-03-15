import React from "react";
import styles from "./toggleButton.module.css";

const ToggleSwitch = ({ isOn, handleToggle, onColor, size }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className={styles.reactSwitchCheckbox}
                id={`reactSwitchNew`}
                type="checkbox"
            />
            <label
                style={{
                    background: isOn && onColor, width: `${size}px`, height: `${size / 2}px`
                }}
                className={styles.reactSwitchLabel}
                htmlFor={`reactSwitchNew`}
            >
                <span
                    className={styles.reactSwitchButton}
                    style={{
                        height: `${size / 2 - 25}px`,
                    }}
                />
            </label>
        </>
    );
};

export default ToggleSwitch;