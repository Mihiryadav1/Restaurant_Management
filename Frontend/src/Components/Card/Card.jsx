import { memo } from 'react'
import styles from './Card.module.css'
const Card = memo(({ name, count, icon }) => {
    return (
        <div className={styles['card-container']}>
            <div>
                <div className={styles["icon"]}>{icon}</div>
                <p>{name}</p>
            </div>
            <div className={styles["count"]}>{count}</div>
        </div>

    )
})

export default Card