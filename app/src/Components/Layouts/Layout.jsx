import React from 'react'
import { Outlet } from 'react-router-dom';  
const Layout = () => {
    return (
        <div>
            <h4>Good Evening</h4>
            <p>Place your order here</p>
            <main> <Outlet /></main>
        </div>
    )
}

export default Layout