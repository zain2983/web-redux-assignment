// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl sm:text-2xl font-bold">HR Candidate Management</h1>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
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
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-blue-500">
            <div className="flex flex-col space-y-2 pb-3">
              <Link 
                to="/add-new-candidate" 
                className={`px-4 py-2 rounded transition ${location.pathname === '/add-new-candidate' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Add New Candidate
              </Link>
              <Link 
                to="/existing-applications" 
                className={`px-4 py-2 rounded transition ${location.pathname === '/existing-applications' ? 'bg-white text-blue-600' : 'hover:bg-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Existing Applications
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;