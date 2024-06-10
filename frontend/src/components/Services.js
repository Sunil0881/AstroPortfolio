import React from 'react'
import Card from './Card'
import lemon from '../assets/lemon.png'
import id from '../assets/id.png'
import call from '../assets/call.png'

const Services = () => {
  return (
    <div className=''>
      <h1 className='font-bold text-black sm:text-3xl text-center mb-2 sm:pb-5 pt-10 md:pb-5 '>Our Services</h1>
      <p className='text-black text-base text-center md:px-32 mb-5  sm:pb-10 lg:px-80 md:pb-10'>Astrologer is here to provide solutions for all your astrological needs. We offer a variety of services ranging
        from horoscopes, astrology consultation, numerology to tarot card reading. </p>
      <div className='px-10 sm:block md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 sm:px-40    md:px-10 md:gap-10 lg:gap-12 lg:px-5 '>
        <Card
          title="Pariharams"
          description="Get personalized pariharams (remedies) from expert astrologers to solve your problems and bring positive changes in your life."
          imgSrc={call}
        />

        <Card
          title="Horoscope"
          description="Discover what the stars have in store for you today with our accurate horoscope predictions."
          imgSrc={lemon}
        />


        <Card
          title="Marriage Matching"
          description="Find your perfect partner with our accurate marriage matching based on astrology and compatibility analysis."
          imgSrc={id}
        />


        <Card
          title="Child Birth"
          description="Explore insights and predictions about child birth through astrological guidance and analysis."
          imgSrc={call}
        />

        <Card
          title="About Career"
          description="Get detailed numerology predictions and advice to help you make informed career choices."
          imgSrc={lemon}
        />

        <Card
          title="Strength & Weakness"
          description="Discover your strengths and weaknesses through detailed tarot readings and personalized analysis."
          imgSrc={id}
        />

      </div>

    </div>
  )
}

export default Services