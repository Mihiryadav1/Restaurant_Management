import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Card from "../Card/Card.jsx"
import { GiChefToque } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import TableGrid from '../TablerGrid/TableGrid.jsx';
import { LineChart } from '@mui/x-charts';
const Home = () => {
  const [chefCount, setChefCount] = React.useState(0);
  const [revenue, setRevenue] = React.useState(0);
  const [orderCount, setOrderCount] = React.useState(0);
  const [filterText, setFilterText] = useState("");

  const [clientCount, setClientCount] = React.useState(0);
  const [orderTypeData, setOrderTypeData] = React.useState([]);
  const [chefStats, setChefStats] = useState([])
  const [tables, setTables] = React.useState([]);
  const [range, setRange] = useState("daily");
  const [chartData, setChartData] = useState([]);


  const getTotalChef = async () => {
    try {
      await axios(`${import.meta.env.VITE_LOCAL_URL}/api/chefs`).then(res => {
        setChefStats(res.data.sort((a, b) => b.currentOrders - a.currentOrders));
        setChefCount(res.data.length);
        console.log("Total Chefs:", data.length);
      })
    }
    catch (err) {
      console.error("Error fetching total chefs:", err);
    }
  }
  // Total Orders
  const getTotalOrders = async () => {
    try {
      await axios(`${import.meta.env.VITE_LOCAL_URL}/api/orders`).then(res => {
        console.log(res, 'Order')
        const orders = res.data.enrichedOrders;
        setOrderCount(orders.length);
      })
    }
    catch (err) {
      console.error("Error fetching total orders:", err);
    }
  }
  // Pie Chart Data
  const getOrderType = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/orders`);
      const data = await response.json();
      const orders = data.orders;

      let dineIn = 0;
      let takeAway = 0;
      let served = 0;

      orders.forEach(order => {
        if (order.type === 'dine-in') dineIn++;
        if (order.type === 'takeaway') takeAway++;
        if (order.status === 'done') served++;
      });

      setOrderTypeData([
        { id: 0, value: dineIn, label: 'Dine-In' },
        { id: 1, value: takeAway, label: 'Takeaway' },
        { id: 2, value: served, label: 'Served' }
      ]);
    } catch (err) {
      console.error("Error fetching order types:", err);
    }
  };

  //Get Reserved Table
  const getReservedTables = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/tables`).then(data => data.json()).then(data => {
        console.log(data.tables)
        setTables(data.tables);
      });

    } catch (err) {
      console.error("Error fetching reserved tables:", err);
    }
  };
  //Get total Revenue
  const getTotalRevenue = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_LOCAL_URL}/api/revenue`).then(data => {
        setRevenue(data.data.totalRevenue)
      })
    } catch (err) {
      console.error("Error fetching reserved tables:", err);
    }
  }
  // Get total Clients
  const getTotalClients = async () => {
    try {
      await axios(`${import.meta.env.VITE_LOCAL_URL}/api/users`).then(res => {
        const users = res.data.users;
        setClientCount(users.length)
        // console.log(data,'Users')
      })
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getTotalChef();
    getTotalOrders()
    getOrderType()
    getReservedTables();
    getTotalRevenue()
    getTotalClients()

  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_LOCAL_URL}/api/revenueByRange?range=${range}`).then(res => {
      const raw = res.data.revenueByRange;
      const formatted = raw.map(d => ({ x: d.label, y: d.amount }));

      if (range === "daily") {
        const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const filledData = allDays.map(day => {
          const match = formatted.find(d => d.x === day);
          return { x: day, y: match ? match.y : 0 };
        });
        setChartData(filledData);
      } else {
        setChartData(formatted);
      }
    });
  }, [range]);
  return (
    <div className={styles['home-container']}>
      <header>
        <input
          type="text"
          placeholder="Filter..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value.toLowerCase())}
        />
      </header>
      <div className={styles["total-container"]}>
        <div
          className={`${styles['card']} ${!filterText || "total chef".toLowerCase().includes(filterText) ? "" : styles['blurred']
            }`}
        >
          <Card name="total chef" count={chefCount} icon={<GiChefToque />} />
        </div>
        <div
          className={`${styles['card']} ${!filterText || "total revenue".toLowerCase().includes(filterText) ? "" : styles['blurred']
            }`}
        >
          <Card name="total revenue" count={revenue} icon={<FaRupeeSign />} />

        </div>
        <div
          className={`${styles['card']} ${!filterText || "total orders".toLowerCase().includes(filterText) ? "" : styles['blurred']
            }`}
        >
          <Card name="total orders" count={orderCount} />

        </div>
        <div
          className={`${styles['card']} ${!filterText || "total clients".toLowerCase().includes(filterText) ? "" : styles['blurred']
            }`}
        >
          <Card name="total clients" icon={<IoPeople />} count={clientCount} />
        </div>
      </div>

      <div className={styles["order-summary"]}>
        <div
          className={`${styles['card']} ${!filterText || "order summary".toLowerCase().includes(filterText) ? "" : styles['blurred']}`}
        >
          <h3>Order Summary</h3>
          <PieChart
            series={[{
              innerRadius: 40,
              outerRadius: 60,
              data: orderTypeData,
              arcLabel: 'label'
            }]}
            width={300}
            height={200}
          />
          <p>DineIn { }</p>
        </div>
        <div
          className={`${styles['card']} ${!filterText || "order revenue".toLowerCase().includes(filterText) ? "" : styles['blurred']}`}
        >
          <h3>Revenue</h3>
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <LineChart
            xAxis={[{ data: chartData.map(d => d.x), scaleType: 'point' }]}
            series={[{ data: chartData.map(d => d.y), label: 'Revenue ₹' }]}
            width={500}
            height={300}
          />
        </div>
        <div
          className={`${styles['card']} ${!filterText || "Tables".toLowerCase().includes(filterText) || "table".includes() ? "" : styles['blurred']}`}
        >
          <h3>Tables</h3>
          <TableGrid />

        </div>
      </div>
      <div className="table">
        <div className={styles['chef-table']}>
          <table>
            <thead>
              <tr>
                <th>Chef Name</th>
                <th>Order Taken</th>
              </tr>
            </thead>
            <tbody>
              {chefStats.map((chef, index) => (
                <tr key={index}>
                  <td>{chef.name}</td>
                  <td>{chef.currentOrders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default Home