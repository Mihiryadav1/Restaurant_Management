import { memo } from 'react'
import styles from './Card.module.css'
const Card = memo(({ name, count, icon }) => {
    return (
        <div className={styles['card-container']}>
            <p>{name}</p>
            <div className={styles["icon"]}>{icon}</div>
            <div className={styles["count"]}>{count}</div>
        </div>

    )
})

export default Card