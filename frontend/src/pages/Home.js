
import LandingPage from '../components/LandingPage'
import Navbar from '../components/Navbar'
import NumberRow from '../components/NumberRow'
import Services from '../components/Services'
import Planet from '../components/Planet'
import Talk from '../components/Talk'
import TestimonialSection from '../components/Testamonial'
import Footer from '../components/Footer'
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import whatsApp from '../assets/WhatsApp.png';
import '../styles/whatsapp.css';



const Home = () => {

  const whatsappUrl = `https://api.whatsapp.com/send?phone=6374151473`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };
  

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToService) {
      const serviceSection = document.getElementById('service');
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className=' quicksand-font'>
        <Navbar />
        <div className='fixed top-[75%] right-0 z-50'>
           <img onClick={handleClick} className='whatsapp-button bg-[#3DDA3A] md:hover:pl-6 md:hover:pr-3 hover:cursor-pointer md:py-2 md:pl-3 rounded-l-full' src={whatsApp} alt="whatsapp" />
        </div>
        <LandingPage />
        <NumberRow />
        <div id='service'>
        <Services />
        </div>
        <Planet />
        <Talk />
        <TestimonialSection />
        <Footer />
      
    </div>
  )
}

export default Home