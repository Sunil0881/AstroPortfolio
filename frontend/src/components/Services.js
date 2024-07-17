import React from "react";
import Card from "./Card";
import lemon from "../assets/lemon.png";
import id from "../assets/id.png";
import call from "../assets/call.png";

const Services = () => {
  return (

   

    <div className=''>
      <h1 className='font-bold text-black text-3xl text-center mb-2 sm:pb-5 pt-10 md:pb-5 '>Our Services</h1>
      <p className='text-black text-base text-center md:px-32 mb-5  sm:pb-10 lg:px-80 md:pb-10 px-3'>Astrologer is here to provide solutions for all your astrological needs. We offer a variety of services ranging
        from horoscopes, astrology consultation, numerology to tarot card reading. </p>
      <div className='px-10 sm:block md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 sm:px-40    md:px-7 md:gap-10 lg:gap-12 lg:px-5 '>
        <Card
          title="Pariharams"
          description="Get personalized pariharams from astrologers to bring positive changes."

          imgSrc={call}
        />

        <Card

          title="Numerology"
          description="Most of the numerology predictions are based on your number."
          imgSrc={lemon}
        />

        <Card
          title="Tarot"
          description="Tarot reading is a powerful form of divination that use an ancient check."
          imgSrc={id}
        />

        <Card
          title="Talk & Chat"
          description="Astrologer talk to you for solving yourproblems by online way."
          imgSrc={call}
          />
        <Card
          title="Horoscope"
          description="Discover your daily horoscope with accurate predictions."
          imgSrc={lemon}
        />


        <Card
          title="Marriage Matching"
          description="Find your perfect match by astrology-based marriage compatibility analysis"
          imgSrc={id}
        />


        <Card
          title="Child Birth"
          description="Explore insights about child birth by astrological guidance and analysis."

          imgSrc={call}
        />

        <Card

          title="Numerology"
          description="Most of the numerology predictions are based on your number."
          imgSrc={lemon}
          />
        <Card
          title="About Career"
          description="Get detailed numerology predictions  to make informed career choices."

          imgSrc={lemon}
        />

        <Card

          title="Tarot"
          description="Tarot reading is a powerful form of 
          divination that use an ancient check."
          imgSrc={id}
        />
        <Card
          title="Strength & Weakness"
          description="Explore strengths and weaknesses by tarot readings and analysis."
          imgSrc={id}
        />
      </div>

      </div>

   
  );
};

export default Services;
