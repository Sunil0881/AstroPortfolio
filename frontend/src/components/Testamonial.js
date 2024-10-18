import React, { useState, useEffect } from "react";
import line from "../assets/Line.png";
import customer from "../assets/customer1.png";
import double from "../assets/double.png";

const testimonials = [
  {
    image: customer, // Directly reference the image
    text: "Astrological reading was incredibly accurate and insightful, providing me with valuable guidance and clarity. Thank you for your professionalism and the profound impact your expertise has had on my life.",
  },
  {
    image: customer, // Directly reference the image
    text: "Another amazing testimonial that gives a lot of positive feedback about the service.",
  },
  {
    image: customer, // Directly reference the image
    text: "Yet another testimonial to showcase the carousel functionality.",
  },
];

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(
        (prevTestimonial) => (prevTestimonial + 1) % testimonials.length
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <h1 className="reddit-sans font-bold text-3xl lg:text-3xl text-center sm:pt-20 sm:pb-2">
          Some Laurels About
        </h1>
        <div className="flex justify-center pb-10">
          <img src={line} width={50} height={50} alt="Line" />
        </div>
      </div>

      <div className="quicksand-font flex-row lg:grid lg:grid-cols-3 px-5 sm:gap-10 items-center sm:px-5 md:px-10 lg:px-16 mb-10">
        <div className="lg:pl-24 md:pl-5 flex justify-center">
          <img className=" h-32 w-32 md:w-64 md:h-64"
            src={testimonials[currentTestimonial].image}
            alt="Customer"
          />
        </div>
        <div className="bg-orange-500 p-2 mt-6 md:mt-0 lg:col-span-2 rounded-2xl">
          <div className="p-3">
            <img className=" h-6 w-6 md:w-12 md:h-12" src={double} alt="Double Quotes" />
          </div>
          <p className="text-white p-3 md:text-lg lg:pt-5 sm:px-5 sm:pb-5 lg:px-10 lg:pb-8">
            {testimonials[currentTestimonial].text}
          </p>
        </div>
        <div className="col-span-3 flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`h-4 w-4 mx-1 rounded-full ${
                currentTestimonial === index ? "bg-orange-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
