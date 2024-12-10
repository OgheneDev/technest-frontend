import React, {useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'

const MainLayout = () => {
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Scroll to top when the path changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Run this effect whenever the route changes
  
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
