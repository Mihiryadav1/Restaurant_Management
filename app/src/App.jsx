import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const OrderDetails = React.lazy(() => import('./Components/OrderDetailsPage/OrderDetails'))
const ConfirmationPage = React.lazy(() => import('./Components/ConfirmationPage/ConfirmationPage'))
const LoginPage = React.lazy(() => import('./Components/Login/LoginPage'))
const MenuPage = React.lazy(() => import('./Components/MenuPage/MenuPage'))
const Layout = React.lazy(() => import('./Components/Layouts/Layout'))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path='/menuPage' element={<MenuPage />} />
          <Route path='/orderDetails' element={<OrderDetails />} />
        </Route>
        <Route path='/confirmation' element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App