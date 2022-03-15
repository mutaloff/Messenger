import React from "react";
import styles from './loader.module.css'

function Loader({ source, size }) {

    return <div className={styles.loaderWrapper}>
        <img src={source} className={styles.loader} width={size} height={size} />
    </div>
}

export default Loader;