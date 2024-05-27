import React from 'react'
import Calendar from '../components/Calender'
import Navbar from '../components/Navbar'
import Booking from '../components/Booking'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div className='overflow-x-hidden reddit-sans'>
      <Navbar />
      <div className='md:flex justify-between md:mx-40 mx-10'>
      <Calendar />
      </div>
      <Booking />
      <Footer />
    </div>
  )
}

export default Contact