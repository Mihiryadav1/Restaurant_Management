import React, { useEffect, useState } from 'react'
import styles from './Menu.module.css'
import axios from 'axios'
const Menu = () => {
    const [menu, setMenu] = useState([])
    const getMenuItems = async () => {
        await axios.get('/api/menu').then(res => {
            const menuItems = res.data.items
            setMenu(menuItems)
            console.log(menuItems)
        });

    }
    useEffect(() => {
        getMenuItems()
    }, [])
    return (
        <div className={styles['menu-container']}>
            {
                menu.map(item => {
                    return (<>
                        <div className={styles["menu-card"]}>
                            <img className={styles['menu-img']}src={item.image} alt="" />
                            <p>Name: {item.name}</p>
                            <p>Category:{item.category}</p>
                            <p>Price:{item.price}</p>
                            <p>Average Prep Time:{item.averagePreparationTime} mins</p>
                        </div>
                    </>)
                })
            }
        </div>
    )
}

export default Menu