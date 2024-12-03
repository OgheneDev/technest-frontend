import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import AuthenticationPage from './pages/AuthenticationPage';
import ShopPage from './pages/ShopPage';


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<LandingPage />} />
        <Route path='/account' element={<AuthenticationPage />} />
        <Route path='/shop' element={<ShopPage />} /> 
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

