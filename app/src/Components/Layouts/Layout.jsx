import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./Layouts.module.css"
const Layout = () => {
    const navigate = useNavigate()

    const getNavigation = () => {
        navigate(-1)
    }
    return (
        <>

            <div className={styles['flex']}>
                <p onClick={() => {
                    getNavigation()
                }}><span><FaArrowLeft /></span></p>
                <div> <h4>Good Evening</h4>
                    <p>Place your order here</p></div>
            </div>
            <main> <Outlet /></main></>
    )
}

export default Layout