import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
const Layout = React.lazy(() => import('../Layout/Layout'))
const Home = React.lazy(() => import('./Components/Home/Home'))
// const LoginScreen = React.lazy(() => import('./mobileApp/LoginScreen'))
const Table = React.lazy(() => import('./Components/Tables/Table'))
const Menu = React.lazy(() => import('./Components/Menu/Menu'))
const OrderLine = React.lazy(() => import('./Components/Order_Line/Order_Line'))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<Home />} />
          <Route path="tables" element={<Table />} />
          <Route path="orderLine" element={<OrderLine />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App