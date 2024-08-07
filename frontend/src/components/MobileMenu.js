// src/MobileMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    onClose(); // Close the mobile menu
    navigate('/', { state: { scrollToService: true } });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-end  p-4">
        <button onClick={onClose} className="text-black text-2xl">
          &times;
        </button>
      </div>
      <nav className="flex flex-col items-center mt-8 space-y-4">
        <a href="/" className="text-black text-xl" onClick={onClose}>
          Home
        </a>
        <a href="/about" className="text-black text-xl" onClick={onClose}>
          About
        </a>
        <button onClick={handleServiceClick} className="text-black text-xl">
          Service
        </button>
        <a href="/display" className="text-black text-xl" onClick={onClose}>
          Blogs
        </a>
       <a href='/contact'>
        <button
          className="text-amber-500 px-2 py-1 bg-stone-800 rounded-sm text-xl"
          onClick={onClose}
        >
          Contact Us
        </button></a>
      </nav>
    </div>
  );
};

export default MobileMenu;
