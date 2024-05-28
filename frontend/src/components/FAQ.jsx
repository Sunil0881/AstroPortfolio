import React, { useState } from "react";

const FaqItem = ({ question, answer, bgColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`mb-4 p-4 px-8 rounded-md shadow-sm cursor-pointer`}
      style={{ backgroundColor: "#FFB02E" }}
      onClick={toggleAnswer} // Move onClick handler to the outer div
    >
      <div className="flex justify-between items-center">
        <p className="text-xl md:text-2xl font-semibold">
          {question}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className={`dropdown-icon w-6 md:w-8 h-6 md:h-8 transition-transform duration-700 ${
            isOpen && "rotate-180"
          }`}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      {isOpen && <div className="answer mt-2">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is Astrology?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bgColor: "pink",
    },
    {
      question: "What are the key principles of Astrology?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      bgColor: "blue",
    },
    {
      question: "How can I book a slot?",
      answer:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      bgColor: "green",
    },
    {
      question: "Where are you located?",
      answer: "There are many variations of passages of Lorem Ipsum available.",
      bgColor: "yellow",
    },
    {
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      bgColor: "gray",
    },
  ];

  return (
    <div className="w-full md:w-[60%] py-8">
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          bgColor={faq.bgColor}
        />
      ))}
    </div>
  );
};

export default FAQ;
