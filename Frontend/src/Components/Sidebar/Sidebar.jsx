import { Link } from 'react-router-dom'
import { IoMdAnalytics } from "react-icons/io";
import { PiOfficeChair } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { MdRestaurantMenu } from "react-icons/md";
import styles from './Sidebar.module.css'
const Sidebar = () => {
    return (
        <div className={styles['sidebar']}>
             <div className={styles["logo"]}>
                      <img src="https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-restaurant-logo-png-image_6136204.png" alt="" />
                    </div>
            <nav>
                <ul className={styles['flex-col']}>
                    <Link to="/analytics">
                        <span>
                            <IoMdAnalytics />
                        </span></Link>
                    <Link to="/tables">
                        <span>
                            <PiOfficeChair />
                        </span></Link>
                    <Link to="/orderLine">
                        <span>
                            <CgNotes />
                        </span></Link>
                    <Link to="/menu">
                        <span>
                            <MdRestaurantMenu />
                        </span></Link>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar