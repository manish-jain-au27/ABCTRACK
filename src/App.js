import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/auth/login-page';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;