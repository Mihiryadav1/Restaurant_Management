import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./Layouts.module.css";

const Layout = () => {
  const navigate = useNavigate();

  const getNavigation = () => {
    navigate(-1);
  };

  // 🕒 Get current hour
  const hour = new Date().getHours();

  // 🌤 Determine greeting
  let greeting = "";
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <>
      <div className={styles['flex']}>
        <p onClick={getNavigation}>
          <span><FaArrowLeft /></span>
        </p>
        <div>
          <h4>{greeting}</h4>
          <p>Place your order here</p>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
