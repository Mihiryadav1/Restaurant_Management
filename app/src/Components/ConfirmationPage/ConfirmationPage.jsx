import React, { useEffect, useState } from 'react'
import styles from './ConfirmationPage.module.css'
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom';
const ConfirmationPage = () => {
    const [timeLeft, setTimeLeft] = useState(3);
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate('/orderDetails');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles['confirmPage']}>
            <div>
                <h2>Thanks for Ordering</h2>
                <div className={styles["lottie"]}>
                    <Lottie
                        path="/check.json"
                        loop='false'
                        autoplay
                        style={{ width: 200, height: 200 }}
                    />
                </div>
                <p>Redirecting in {timeLeft} seconds...</p>

            </div>
        </div>
    )
}

export default ConfirmationPage