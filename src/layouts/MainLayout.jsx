import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout
