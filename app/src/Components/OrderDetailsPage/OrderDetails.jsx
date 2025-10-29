import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './OrderDetails.module.css'
import axios from 'axios';
import { increment, decrement, removeItem, clearCart } from '../../../store/Slice/cartSlice';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { SwipeButton } from 'swipe-button';
import { FaArrowRight } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
const OrderDetails = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        name: "",
        contact: "",
        address: "",
        numberOfPersons: ""
    });

    const cart = useSelector(state => state.cart);
    const [orderType, setOrderType] = useState("takeaway");
    const [instructions, setInstructions] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deliveryTime, setDeliveryTime] = useState(10);

    const itemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = orderType === "dine-in" ? 0 : 50;
    const tax = Math.round(itemTotal * 0.025);
    const grandTotal = itemTotal + deliveryCharge + tax;


    const buildOrderPayload = () => ({
        orderId: "ORD" + Math.floor(100 + Math.random() * 900),
        type: orderType,
        address: orderType === "takeaway" ? userDetails.address : '',
        tableNumber: orderType === "dine-in" ? userDetails.numberOfPersons : 0,
        name: userDetails.name,
        phone: userDetails.contact,
        items: cart.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity
        })),
        totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: grandTotal,
        cookingInstructions: instructions
    });

    //Handle Order Submit
    const handleOrderSubmit = async () => {
        if (!userDetails.name || !userDetails.contact || cart.length === 0) {
            alert("Missing user info or cart is empty");
            return;
        }

        const payload = buildOrderPayload();
        try {
            const res = await axios.post(`${import.meta.env.VITE_LOCAL_URL}/api/orders`, payload);
            console.log("Order placed:", res);
            toast.success("Order Created Successfully!", {
                position: "top-center",
                autoClose: 2000,
            });
            setDeliveryTime(prev => prev + res.data.order.processingTime)
            setTimeout(() => {
                navigate('/confirmation');
            }, 2000);
            dispatch(clearCart())
            console.log(cart, 'Cleared')
        } catch (err) {
            console.error("Order error:", err.response?.data || err.message);
        }
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('UserDetails');
        if (storedUser) {
            setUserDetails(JSON.parse(storedUser))
        }

    }, [])

    return (
        <div className={styles['main']}>
            <ToastContainer/>
            <div className={`${styles['orderContainer']} ${showModal ? styles.blurred : ''}`}>
                <h2>Order Summary</h2>
                <div className={styles['cartItems']}>
                    {/* Cart Items Display */}
                    {cart.map(item => (
                        item.quantity !== 0 && (<div key={item.itemId} className={styles['item']}>
                            <img src={item.image} alt="" />
                            <div className={styles["ordercontrol"]}>
                                <div className={styles["orderDescription"]}>
                                    <span>{item.name}</span>
                                    <p><span>Item Price ₹ {item.price}</span></p>
                                    <p><span><p>Qunatity {item.quantity}</p></span></p>
                                    <p><span>TotalPrice: ₹{item.price * item.quantity}</span></p>
                                </div>
                                <div className={styles['quantityControls']}>
                                    <button className='decrementBtn' onClick={() => dispatch(decrement(item.itemId))}>−</button>
                                    <span className='count'>{item.quantity}</span>
                                    <button className='incrementBtn' onClick={() => dispatch(increment(item.itemId))}>+</button>
                                    <button className='removeBtn' onClick={() => dispatch(removeItem(item.itemId))}>🗑️</button>
                                </div>
                            </div>
                        </div>)
                    ))}
                </div>

                {/* Cooking Instructions */}
                <div className={styles.instructions}>
                    <label onClick={() => setShowModal(true)} className={styles.instructionLabel}>
                        {instructions ? `Edit cooking instructions` : `Add cooking instructions (optional)`}
                    </label>
                    {instructions && <p className={styles.preview}>{instructions}</p>}
                </div>

                {/*  Dine-in or Takeaway selector */}
                <div className={styles.deliveryType}>
                    <div className={styles['deliveryAction']}>
                        <button
                            className={`btn ${orderType === "dine-in" ? styles.active : ""}`}
                            onClick={() => setOrderType("dine-in")}
                        >
                            Dine In
                        </button>

                        <button
                            className={`btn ${orderType === "takeaway" ? styles.active : ""}`}
                            onClick={() => setOrderType("takeaway")}
                        >
                            Take Away
                        </button>
                    </div>
                    <div className={styles["totalPricing"]}>
                        <div className='flex between mtb-1'>
                            <p>Delivery Charges</p>
                            <p>{deliveryCharge}</p>
                        </div>
                        <div className='flex between mtb-1'>
                            <p>Taxes</p>
                            <p>{tax}</p>
                        </div>
                        <div className='flex between mtb-1'>
                            <p>Grand Total</p>
                            <p>{grandTotal}</p>
                        </div>
                    </div>
                </div>

                {/*  User details */}
                <div className={styles["userDetails"]}>
                    <p>Your Details</p>
                    <p>{userDetails.name}{" "}</p>
                    <p>Contact- {userDetails.contact}</p>
                    {orderType === 'takeaway' && (
                        <>
                            <p> <span className={styles["icon"]}><FaMapMarkerAlt /></span> Delivery at Home - {userDetails.address}</p>
                            <p> <span className={styles["icon"]}><FaMapMarkerAlt /></span> Time - {deliveryTime} min</p>
                        </>
                    )
                    }

                </div>
            </div>


            {/* Swiper to order button */}
            <div className={styles['swiperToOrder']}>
                <SwipeButton.Root onSuccess={handleOrderSubmit}>
                    <SwipeButton.Rail>
                        <span>Swipe to Confirm</span>
                    </SwipeButton.Rail>
                    <SwipeButton.Overlay>
                        <span>Confirmed!</span>
                    </SwipeButton.Overlay>
                    <SwipeButton.Slider>
                        <FaArrowRight />
                    </SwipeButton.Slider>
                </SwipeButton.Root>
            </div>

            {/* Instructrions Pop up Modal */}
            <div>
                <div className={styles['modalWrapper']}>
                    {showModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles["closeModal"]} onClick={() => setShowModal(false)}>
                                <span><RxCross1 /></span>
                            </div>
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
                                        handleOrderSubmit()
                                        navigate('/')
                                    }
                                    }>Next</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default OrderDetails