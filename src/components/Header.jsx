// src/components/Header.jsx

import React from 'react';
// Import the logo image from the assets folder
import logo from '../assets/images/logo.svg';

const Header = () => {
  return (
    <header className="flex items-center p-4 bg-white shadow">
      <img src={logo} alt="Quiz Master Logo" className="w-12 h-12 mr-4" />
      <h1 className="text-2xl font-bold">Quiz Master</h1>
    </header>
  );
};

export default Header;
