import React, { useEffect, useState } from 'react'
import styles from './Table.module.css'
import axios from 'axios'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaChair } from "react-icons/fa6";

const Table = () => {
    const [tableName, setTableName] = React.useState("Table");
    const [chairCount, setChairCount] = React.useState(2);
    const [showPopup, setShowPopup] = React.useState(false);
    const [tables, setTables] = useState([])
    const fetchTables = async () => {
        await axios(`${import.meta.env.VITE_LOCAL_URL}/api/tables`).then(res => {
            setTables(res.data.tables)
            console.log(res.data.tables)
            setTableName(res.data.tables.name)
        })
    }
    const createTable = async () => {
        try {

            const payload = {
                name: tableName,
                size: chairCount
            };
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_URL}/api/tables`, payload);
            console.log("✅ Table created:", response.data);

            // Refresh table list
            fetchTables();

            // Reset form and close popup
            setTableName("");
            setChairCount(2);
            setShowPopup(false);
        } catch (err) {
            console.error("Error creating table:", err);
        }
    };

    const deleteTable = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/api/tables/${id}`);
            fetchTables()
            // console.log("🗑️ Table deleted:", response.data);
            //Add Toast Here

        } catch (err) {
            console.error("Error deleting table:", err);
        }
    };

    useEffect(() => {
        fetchTables()
    }, [])


    return (
        <>
            <div className={styles["table-grid"]}>
                {
                    tables.length <= 30 && tables.map((item, index) => {
                        return (<>
                            <div className={styles['table-block']} key={item._id}>
                                <p>Table {item.name}</p>
                                <div className={styles["tableDetails"]}>
                                    <p onClick={() => {
                                        deleteTable(item._id)
                                    }}>
                                        <span className='icon'>
                                            <MdOutlineDeleteSweep />
                                        </span>
                                    </p>
                                    <p style={{ display: "flex", gap: "10px" }}>
                                        <span><FaChair /></span>
                                        <span>{item.size} </span>
                                    </p>
                                </div>
                            </div>
                        </>)
                    })
                }
                <div className={styles["popupWindow"]}>
                    <button className={styles['addTableBtn']} onClick={() => {
                        setShowPopup(!showPopup)
                    }}>+</button>

                    {
                        showPopup ? (<div className={styles['popup']}>
                            <input
                                type="text"
                                placeholder="Table no (optional)"
                                value={tableName}
                                min={1}
                                max={30}
                                onChange={(e) => setTableName(e.target.value)}
                            />
                            <div className={styles["popUpActions"]}>
                                <select value={chairCount} onChange={(e) => setChairCount(Number(e.target.value))}>
                                    {[2, 4, 6, 8].map((count) => (
                                        <option key={count} value={count}>{count} chairs</option>
                                    ))}
                                </select>
                                <button onClick={createTable}>Create</button>
                            </div>
                        </div>) : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Table