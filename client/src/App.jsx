// src/App.js
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminPage from './pages/admin/AdminPage';
import AddProduct from './pages/admin/AddProduct';
import DeleteProduct from './pages/admin/DeleteProduct';
import ModifyProduct from './pages/admin/ModifyProduct';
import Header from './components/Header'
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  // const baseURL = "https://asiatextilespk.onrender.com";
  const baseURL = "http://localhost:5000";
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/admin" element={<AdminPage baseURL={baseURL}/>} />
        <Route path="/admin/add" element={<AddProduct baseURL={baseURL} />} />
        <Route path="/admin/delete" element={<DeleteProduct baseURL={baseURL} />} />
        <Route path="/admin/modify" element={<ModifyProduct baseURL={baseURL} />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
