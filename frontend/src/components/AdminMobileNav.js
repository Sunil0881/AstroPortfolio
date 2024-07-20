// src/MobileMenu.js


const MobileMenu = ({ isOpen, onClose }) => {
 

 

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
        <a href="/addslot" className="text-black text-xl" onClick={onClose}>
          AddSlot
        </a>
        <a href="/Upload" className="text-black text-xl" onClick={onClose}>
          AddBlog
        </a>
        
      </nav>
    </div>
  );
};

export default MobileMenu;
