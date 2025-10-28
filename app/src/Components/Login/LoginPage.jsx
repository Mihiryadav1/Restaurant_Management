import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"
const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        numberOfPersons: "",
        address: "",
        contact: "",

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_LOCAL_URL}/api/users`, formData).then(res => {
                console.log(res.data, 'API User')
                localStorage.setItem('UserDetails', JSON.stringify(formData));

            });

            setFormData({
                name: "",
                numberOfPersons: "",
                address: "",
                contact: "",

            })
            navigate('/menuPage')
        } catch (err) {
            console.error("Submit error:", err.response?.data || err.message);
        }
    };



    return (
        <div className={styles["login-container"]}>
            <div className={styles["innerLogin"]}>
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Number of Person</label>
                    <input
                        type="text"
                        name="numberOfPersons"
                        placeholder="2, 4, 6"
                        value={formData.numberOfPersons}
                        onChange={handleChange}
                        required
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <label>Contact</label>
                    <input
                        type="text"
                        name="contact"
                        placeholder="phone"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Order Now</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
