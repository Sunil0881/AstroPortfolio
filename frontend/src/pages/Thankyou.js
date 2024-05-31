import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import "../styles/thankyou.css";

const Thankyou = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [showCircle, setShowCircle] = useState(true);
  const [showTick, setShowTick] = useState(false);
  const [showText, setShowText] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Retrieve booking data from localStorage
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    }

    // Show tick after circle animation completes
    const tickTimer = setTimeout(() => {
      setShowCircle(false);
      setShowTick(true);
    }, 2500); // Reduced time between circle and tick to 2.5s

    // Show text after tick animation completes
    const textTimer = setTimeout(() => {
      setShowTick(false);
      setShowText(true);
    }, 3500); // Tick animation duration + delay

    // Cleanup the timers
    return () => {
      clearTimeout(tickTimer);
      clearTimeout(textTimer);
    };
  }, []);

  useEffect(() => {
    // Send email using EmailJS when showText becomes true
    if (showText && bookingData && !emailSent) {
      sendEmail();
    }
  }, [showText, bookingData, emailSent]);

  // Function to send email using EmailJS
  const sendEmail = () => {

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(bookingData.date).toLocaleDateString('en-GB', options);

    const templateParams = {
      name: bookingData.name,
      date: formattedDate,
      time: bookingData.time,
      mode: bookingData.mode,
      email: bookingData.email, // Add email address from bookingData
    };
  
    emailjs.send(
      'service_akt6h9j',
      'template_bs48k17',
      templateParams,
      'dHqWDQSysc65dG5Uv'
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setEmailSent(true); // Set emailSent to true after email is sent successfully
        // Redirect to the homepage after 5 seconds
        setTimeout(() => {
          navigate('/');
        }, 5000);
      })
      .catch((error) => {
        console.error('Email could not be sent:', error);
      });
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-500 to-amber-500">
      <div className="container bg-white rounded-lg shadow-lg p-8 md:p-12 relative">
        <div className="content">
          {showCircle && (
            <svg
              className="circle-animation w-40 h-40 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                stroke="currentColor"
              />
            </svg>
          )}

          {showTick && (
            <svg
              className="tick-animation w-40 h-40 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}

          {showText && (
            <>
              <h2 className="fade-in-animation text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
                Thank you for booking your slot.
              </h2>
              <div className='flex justify-center'>
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2" // Increased thickness to 2
                    d="M6 12l4 4l8-8" // Adjusted coordinates to position tick in center
                  />
                </svg>
              </div>
              <p className="fade-in-animation text-lg md:text-xl">
                Check your email
              </p>
              <p className="fade-in-animation mt-4 text-base md:text-lg text-gray-700">
                You will be redirected shortly.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
