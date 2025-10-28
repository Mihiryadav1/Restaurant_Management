// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../src/Components/Sidebar/Sidebar';
import styles from '../Layout/Layout.module.css';
function Layout() {
  return (
    <div className={styles['grid-container']}>
      <p className={styles["sidebar"]}>
        
        <Sidebar />
      </p>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;