// src/App.js
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminPage from './pages/admin/AdminPage';
import AddProduct from './pages/admin/AddProduct';
import DeleteProduct from './pages/admin/DeleteProduct';
import ModifyProduct from './pages/admin/ModifyProduct';
import Header from './components/Header'
import Home from './pages/Home';

function App() {
  const baseURL = "https://asiatextilespk.onrender.com";
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/admin" element={<AdminPage baseURL={baseURL}/>} />
        <Route path="/admin/add" element={<AddProduct />} />
        <Route path="/admin/delete" element={<DeleteProduct />} />
        <Route path="/admin/modify" element={<ModifyProduct />} />
      </Routes>
    </>
  );
}

export default App;
