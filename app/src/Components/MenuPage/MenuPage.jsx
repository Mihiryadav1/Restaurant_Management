import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decrement, increment } from "../../../store/Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiBowlNoodles } from "react-icons/ci";
import { LuSalad } from "react-icons/lu";
import {
  FaPizzaSlice,
  FaHamburger,
  FaIceCream,
  FaBreadSlice,
  FaSearch,
} from "react-icons/fa";
import { RiDrinks2Fill } from "react-icons/ri";
import LoadingPage from '../Loading/LoadingPage'

const MenuPage = () => {
  const categories = [
    { name: "Pizza", icon: <FaPizzaSlice /> },
    { name: "Burger", icon: <FaHamburger /> },
    { name: "Pasta", icon: <CiBowlNoodles /> },
    { name: "Salad", icon: <LuSalad /> },
    { name: "Beverage", icon: <RiDrinks2Fill /> },
    { name: "Dessert", icon: <FaIceCream /> },
    { name: "Bread", icon: <FaBreadSlice /> },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const [searchText, setSearchText] = useState("");
  const [menus, setMenus] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setoffSet] = useState(0);
  const [limit, setLimit] = useState(6);
  const [Loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(0)
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(
      addItem({
        itemId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    );
  };

  const filterSearch = async () => {
    try {
      const searchFilter = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/api/menu?search=${searchText}&category=${selectedCategory}`
      );
      setMenus(searchFilter.data.items);
      setSearchText("");
    } catch (err) {
      console.log(err);
    }
  };

 
  //get Scroll position

  const handleMenuChange = async () => {
    await axios.get(`${import.meta.env.VITE_LOCAL_URL}/api/menu`, {
      params: {
        category: selectedCategory,
        limit,
        offSet,
      },
    }).then(res => {
      console.log(res, 'Res')
      // setMenus(res.data.items)
      setMenus(prev=>[...prev,...res.data.items])
      
    })
  }
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = scrollTop + clientHeight;
    if (position >= scrollHeight - 5) {
      setScroll(100);
    }
  };
  //  Reset everything when category changes
  useEffect(() => {
    setoffSet(0);
    setMenus([]);
    setScroll(0);
    setHasMore(true);
  }, [selectedCategory]);

  // Detect scroll bottom -> load more
  useEffect(() => {
    if (scroll === 100 && hasMore && menus.length > 0) {
      setoffSet(prev => prev + menus.length);
      setScroll(100)
    }

  }, [scroll]);

  // 3Fetch data when category or offset changes
  useEffect(() => {
    if (!selectedCategory) return;
    handleMenuChange();
  }, [selectedCategory, offSet]);



  return (
    <>
      <div className={styles["greet"]}></div>
      <div className={styles.categoryScroll}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`${styles.categoryItem} ${selectedCategory === cat.name ? styles.active : ""
              }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span className={styles["categoryIcon"]}>{cat.icon}</span>
            <span className={styles["categoryName"]}>{cat.name}</span>
          </div>
        ))}
      </div>

      <div className={styles["filter"]}>
        <button onClick={filterSearch}>
          <FaSearch />
        </button>
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div className={styles["menuContainer"]} onScroll={handleScroll}>
        {!Loading ? (
          menus.map((item, index) => (
            <div className={styles["menu-card"]} key={item._id + index}>
              <div className={styles["menu-details"]}>
                <img src={item.image} alt="" className={styles["menu-image"]} />
                <div className={styles["flex"]} style={{ padding: "0.8rem" }}>
                  <div>
                    <p className={styles["name"]}>{item.name}</p>
                    <p className={styles["price"]}>
                      <FaIndianRupeeSign />
                      {item.price}
                    </p>
                  </div>
                  <div>
                    {cart.find((c) => c.itemId === item._id) ? (
                      <div className={styles["quantity-controls"]}>
                        <button
                          onClick={() => dispatch(decrement(item._id))}
                          className={styles["controls"]}
                        >
                          -
                        </button>
                        <span className={styles["controls"]}>
                          {cart.find((c) => c.itemId === item._id)?.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increment(item._id))}
                          className={styles["controls"]}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(item)}
                        className={styles["controls"]}
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LoadingPage />
        )}
      </div>

      <div className={styles["nextBtn"]}>
        <button
          disabled={cart.length === 0}
          onClick={() => navigate("/orderDetails")}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MenuPage;
