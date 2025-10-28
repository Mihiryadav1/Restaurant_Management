import React from 'react'
import styles from './Loading.module.css'
import Lottie from "lottie-react";
const Loading = () => {
    return (
        <div className={styles['loadingContainer']}>
            <Lottie
                path="/loading.json"
                loop
                autoplay
                style={{ width: 500, height: 500 }}
            />
        </div>
    )
}

export default Loading