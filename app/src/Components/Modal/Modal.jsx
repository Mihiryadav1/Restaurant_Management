import React, { memo } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.css'
const Modal = memo(({ setInstructions, setShowModal, handleOrderSubmit, instructions }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className={styles.modalOverlay}>
                <div className={styles["closeModal"]} onClick={() => setShowModal(false)}><RxCross1 /></div>
                <div className={styles['modalContent']}>
                    <h2>Cooking Instructions</h2>
                    <textarea
                        value={instructions}
                        onChange={e => setInstructions(e.target.value)}
                        placeholder="e.g., Extra spicy, no onions..."
                    />
                    <p>The restaurant will try its best to follow your request. However, refunds or cancellations in this regard won’t be possible</p>
                    <div className={styles['modalActions']}>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                        <button onClick={() => {
                            // setShowModal(false)
                            handleOrderSubmit()
                            navigate('/')
                        }
                        }>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Modal