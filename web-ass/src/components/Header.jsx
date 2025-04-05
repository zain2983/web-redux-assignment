// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HR Candidate Management</h1>
        <div className="flex space-x-4">
          <Link 
            to="/add-new-candidate" 
            className={`px-4 py-2 rounded transition ${location.pathname === '/add-new-candidate' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'}`}>
            Add New Candidate
          </Link>
          <Link 
            to="/existing-applications" 
            className={`px-4 py-2 rounded transition ${location.pathname === '/existing-applications' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'}`}>
            Existing Applications
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;