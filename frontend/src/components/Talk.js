import React from "react";
import Card from "./Card";
import lemon from "../assets/lemon.png";
import call from "../assets/call.png";
import id from "../assets/id.png";

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
          title="Talk & Chat"
          description="Astrologer talk to you for solving your
          problems by online way."
          imgSrc={call}
        />

        <Card
          title="Numerology"
          description="Most of the numerology predictions are 
          based on your number."
          imgSrc={lemon}
        />

        <Card
          title="Tarot"
          description="Tarot reading is a powerful form of 
          divination that use an ancient check."
          imgSrc={id}
        />

        <Card
          title="Talk & Chat"
          description="Astrologer talk to you for solving your
          problems by online way."
          imgSrc={call}
        />

        <Card
          title="Numerology"
          description="Most of the numerology predictions are 
          based on your number."
          imgSrc={lemon}
        />

        <Card
          title="Tarot"
          description="Tarot reading is a powerful form of 
          divination that use an ancient check."
          imgSrc={id}
        />
      </div>
    </div>
  );
};

export default Talk;
