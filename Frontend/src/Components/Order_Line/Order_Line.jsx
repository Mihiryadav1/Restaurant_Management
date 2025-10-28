import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Order_Line.module.css';

const Order_Line = () => {
  const [orderCard, setOrderCard] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [now, setNow] = useState(new Date());

  // Update current time every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/api/orders`).then(res => {
        console.log(res.data, 'res')
        setOrderCard(res.data.orders);
      });
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  // Fetch menu items
  const getMenu = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_LOCAL_URL}/api/menu`);
      setMenuItems(data.items);
    } catch (err) {
      console.error('Failed to fetch menu', err);
    }
  };

  useEffect(() => {
    getAllOrders();
    getMenu();
  }, []);

  // Auto-update expired orders
  useEffect(() => {
    let isMounted = true;

    const markExpiredOrders = async () => {
      const expiredOrders = orderCard.filter(
        (order) =>
          new Date(order.processingEndsAt) <= now && order.status !== 'done'
      );

      if (expiredOrders.length === 0) return;

      try {
        await Promise.all(
          expiredOrders.map((order) =>
            axios.patch(`${import.meta.env.VITE_LOCAL_URL}/api/orders/${order._id}`, { status: 'done' })
          )
        );

        // ✅ Check if still mounted before updating state
        if (isMounted) {
          setOrderCard((prev) =>
            prev.map((order) =>
              new Date(order.processingEndsAt) <= now
                ? { ...order, status: 'done' }
                : order
            )
          );
        }
      } catch (err) {
        console.error('Failed to update expired orders', err);
      }
    };

    markExpiredOrders();

    return () => {
      isMounted = false;
    };
  }, [now, orderCard]);

  return (
    <div className={styles['order-grid']}>
      {orderCard.map((order, index) => {
        const isExpired = new Date(order.processingEndsAt) <= now;
        const effectiveStatus = isExpired ? 'done' : order.status;

        return (
          <div
            key={order._id || index}
            className={`${styles['orderCard']} ${styles[effectiveStatus]} ${order.type === "takeaway" ? styles['takeaway'] : ""}`}
          >
            <h3>#{order.orderId}</h3>
            <div>
              <div className={styles["wrapper"]}>
                <strong>Table:</strong> {order.tableNumber || '—'}
                <p>
                  <strong>Type:</strong> {order.type}
                </p>
                <p>
                  <strong>Processing Time:</strong> {order.processingTime} min
                </p>
                <b>Order List</b>
                <ul className={styles['itemList']}>
                  {order.items.map((item, i) => {
                    const matched = menuItems.find(
                      (menuItem) => menuItem._id === item.itemId
                    );
                    return (
                      <li key={i}>
                        {item.quantity} × {matched ? matched.name : 'Unknown Item'}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles["wrapper"]}>
              <p style={{ color: effectiveStatus === "done" ? "green" : "orange" }}>
                <strong>Status:</strong> {effectiveStatus}
              </p>
            </div>

          </div>
        );
      })}
    </div >
  );
};

export default Order_Line;
