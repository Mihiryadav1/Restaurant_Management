import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TableGrid.module.css';

const TableGrid = () => {
    const [tableName, setTableName] = React.useState("Table");
    const [tables, setTables] = useState([])
    const fetchTables = async () => {
        await axios('/api/tables')
            .then(result => {
                console.log(result.data.tables, 'result')
                setTables(result.data.tables)
                setTableName(result.data.tables.name)
            })
    }

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div className={styles['grid']}>
            {tables.map((table) => {
                const statusClass = table.reserved ? styles['reserved'] : styles['unreserved'];
                return (
                    <div className={`${styles['table-block']} ${statusClass}`} key={table._id}>
                        <strong>  Table </strong>
                        <div>{table.name}</div>
                    </div>
                );
            })}
        </div>

    );
};

export default TableGrid;
