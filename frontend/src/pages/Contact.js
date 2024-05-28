import React from 'react'
import Calendar from '../components/Calender'
import Navbar from '../components/Navbar'
import Booking from '../components/Booking'
import Footer from '../components/Footer'
import whatsApp from '../assets/WhatsApp.png';
import '../styles/whatsapp.css';


const Contact = () => {

  const whatsappUrl = `https://api.whatsapp.com/send?phone=6374151473`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='overflow-x-hidden quicksand-font'>
       <div className='fixed top-[75%] right-0 z-50'>
           <img onClick={handleClick} className='whatsapp-button bg-[#3DDA3A] md:hover:pl-6 md:hover:pr-3 hover:cursor-pointer md:py-2 md:pl-3 rounded-l-full' src={whatsApp} alt="whatsapp" />
        </div>
      <Navbar />
      <div className='md:flex justify-between md:mx-20 mx-10'>
      <Calendar />
      </div>
      <Booking />
      <Footer />
    </div>
  )
}

export default Contact