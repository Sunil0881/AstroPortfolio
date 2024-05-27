import { useState } from 'react'
import React from 'react'
import Moon from '../assets/moon.png'
import Recline from '../assets/recline.png'
import MobileMenu from './MobileMenu';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="mb-3 ">
        <img src={Recline} alt="recline" />
      </div>
      <div className="relative flex justify-between px-5 md:px-10">
        <div className="flex ">
          <img className="absolute" src={Moon} height={50} width={100} alt="moon" />
          <h1 className="text-amber-500  ml-4  mt-8 md:mt-6 text-3xl md:text-4xl font-bold">Astronomica</h1>
        </div>
        <div className="flex mt-8 md:hidden">
          <button
            className="text-black text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
          >
            &#9776; {/* Hamburger icon */}
          </button>
        </div>
        <nav className="hidden items-center md:flex lg:gap-8 md:gap-4 md:mt-7">
          <Link to="/" className="text-black hover:scale-95 text-xl">
            Home
          </Link>
          <Link to="/about" className="text-black hover:scale-95 text-xl">
            About
          </Link>
          <Link to="#service" className="text-black hover:scale-95 text-xl">
            Service
          </Link>
          <Link to="/contact" className="text-black hover:scale-95 text-xl">
            Contact Us
          </Link>
          <button className="text-amber-500 p-2 px-4 bg-stone-800 hover:bg-stone-700 hover:scale-95 rounded text-xl">
            Get in touch
          </button>
        </nav>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </div>
  );
};


export default Navbar