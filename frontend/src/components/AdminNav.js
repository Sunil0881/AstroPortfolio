import { useState } from 'react'
import React from 'react'
import Moon from '../assets/moon.png'
import Recline from '../assets/recline.png'
import MobileMenu from './AdminMobileNav';
import { Link  } from "react-router-dom";


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
        <a href='/' ><img className="absolute" src={Moon} height={50} width={100} alt="moon" /></a>
          <a href='/' ><h1 className="text-amber-500  ml-4  mt-8 md:mt-6 text-3xl md:text-4xl font-bold">Astro Sri</h1></a>
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
          <Link to="/addslot" className="text-black hover:scale-95 text-xl">
            AddSlot
          </Link>
          <Link to="/Upload" className="text-black hover:scale-95 text-xl">
            AddBlog
          </Link>
          
        </nav>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </div>
  );
};


export default Navbar