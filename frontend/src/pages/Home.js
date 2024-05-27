
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



const Home = () => {

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