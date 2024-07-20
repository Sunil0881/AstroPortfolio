// src/MobileMenu.js

import { Link, useNavigate } from "react-router-dom";


const MobileMenu = ({ isOpen, onClose }) => {
 
  const navigate = useNavigate();
  const Logout = () => {
    window.localStorage.clear();
    navigate("/");
  }
 

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
        <Link to="/addslot" className="text-black text-xl" onClick={onClose}>
          AddSlot
        </Link>
        <Link to="/Upload" className="text-black text-xl" onClick={onClose}>
          AddBlog
        </Link>
        <button className='bg-orange-500 px-1 py-1 rounded-lg hover:scale-95 hover:bg-orange-600' onClick={Logout}>Log Out</button>
      </nav>
    </div>
  );
};

export default MobileMenu;
