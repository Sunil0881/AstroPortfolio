import React from "react";
import Card from "./Card";
import health from "../assets/health.png";
import career from "../assets/career.png";
import legal from "../assets/legal.png";
import love from "../assets/love.png";
import partner from "../assets/partner.png";
import purse from "../assets/purse.png";

const Talk = () => {
  return (
    <div className=" mx-6 md:mx-14 lg:mx-32">
      <h1 className="font-semibold pb-3 text-2xl lg:text-3xl text-center sm:pb-5 md:pb-5">
        Talk to Astrologer About
      </h1>
      <p className="text-black text-base pb-7 text-center md:px-32 sm:pb-10  lg:px-80 md:pb-10">
        Astrologer is here to provide solutions for all your astrological needs.
        We offer a variety of services ranging from horoscopes, astrology
        consultation, numerology to tarot card reading.
      </p>
      <div className=" pt-6 sm:block md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 md:gap-10 lg:gap-12 ">
        <Card
          title="Love"
          description="Everyone needs love and compassion. The right time and partner is all it requires."
          imgSrc={love}
        />

        <Card
          title="Money"
          description="Money is the most basic requirement, beat it might not come to everyone that easy. "
          imgSrc={purse}
        />

        <Card
          title="Partner"
          description="Everyone needs a perfect the partner
and a happy married life. "
          imgSrc={partner}
        />

        <Card
          title="Health"
          description="Health is in true sense wealth. One cannot afford to lose of any cost."
          imgSrc={health}
        />

        <Card
          title="Career"
          description="Career progress can stagnate. Learn the right paths to overcome this."
          imgSrc={career}
        />

        <Card
          title="Legal Issues"
          description="
Avoid draining legal issues by understanding the movements of the stars."
          imgSrc={legal}
        />
      </div>
    </div>
  );
};

export default Talk;
