import React from 'react'
import Card from './Card'
import lemon from '../assets/lemon.png'
import call from '../assets/call.png'
import id from '../assets/id.png'

const Booking = () => {
  return (
    <div>
        <div>
            <div>
                <h1 className='font-semibold text-4xl md:text-center px-10 my-4'>Also Booking For</h1>
            </div>
            <div>
                <p className='md:text-center px-10 my-3 font-normal text-gray-600'>Astrologer is here to provide solutions for all your astrological needs. We offer a variety of services ranging <br/>
                from horoscopes, astrology consultation, numerology to tarot card reading. </p>
            </div>
            <div className='px-10 sm:block md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 sm:px-40 md:px-7 md:gap-10 lg:gap-12 lg:px-5'>
        <Card
          title="Pariharams"
          description="Get personalized pariharams from astrologers to bring positive changes."
          imgSrc={call}
          buttonText="READ MORE"
          buttonLink={`/display?category=Pariharams`}
        />
        
        <Card
          title="Talk & Chat"
          description="Astrologer talk to you for solving your problems by online way."
          imgSrc={call}
          buttonText="READ MORE"
          buttonLink={`/display?category=Talk & Chat`}
        />
        <Card
          title="Horoscope"
          description="Discover your daily horoscope with accurate predictions."
          imgSrc={lemon}
          buttonText="READ MORE"
          buttonLink={`/display?category=Horoscope`}
        />
        <Card
          title="Marriage Matching"
          description="Find your perfect match by astrology-based marriage compatibility analysis."
          imgSrc={id}
          buttonText="READ MORE"
          buttonLink={`/display?category=Marriage Matching`}
        />
        <Card
          title="Child Birth"
          description="Explore insights about child birth by astrological guidance and analysis."
          imgSrc={call}
          buttonText="READ MORE"
          buttonLink={`/display?category=Child Birth`} 
        />
        
        <Card
          title="About Career"
          description="Get detailed numerology predictions to make informed career choices."
          imgSrc={lemon}
          buttonText="READ MORE"
          buttonLink={`/display?category=About Career`}
        />
        
      </div>
        </div>
    </div>
  )
}

export default Booking