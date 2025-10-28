import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
const Sidebar = () => {
    return (
        <div className={styles['sidebar']}>
            <nav>
                <ul className={styles['flex-col']}>
                    <Link to="/analytics">Analytics</Link>
                    <Link to="/tables">Tables</Link>
                    <Link to="/orderLine">Order Line</Link>
                    <Link to="/menu">Menu</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar