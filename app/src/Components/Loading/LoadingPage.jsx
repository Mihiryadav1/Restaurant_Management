import React from 'react'
import styles from './Loading.module.css'
import Lottie from "lottie-react";
const Loading = () => {
    return (

        <div className={styles['loadingContainer']}>
            {/* <div className={styles["lottie"]}> */}
            <Lottie
                path="/loading.json"
                loop
                autoplay
                width={430}
                height={430}
            />
            {/* </div> */}
        </div>
    )
}

export default Loading