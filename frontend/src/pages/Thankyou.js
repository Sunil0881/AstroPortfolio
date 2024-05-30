import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Retrieve booking data from localStorage
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    }

    // Redirect to the homepage after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-500 to-amber-500">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-lg mx-auto relative">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4">
          Thank you for booking your slot.
        </h2>
        
        {bookingData ? (
          <div className="w-full flex justify-center mt-6">
            <svg className="animate-bounce w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : null}

        {bookingData ? (
          <div className="mt-4 text-lg text-gray-700">
            <p>Booking Data:</p>
            <pre className="text-left bg-gray-100 p-4 rounded-lg overflow-auto">{JSON.stringify(bookingData, null, 2)}</pre>
          </div>
        ) : (
          <p className="mt-4 text-lg text-gray-700">
            Loading booking data...
          </p>
        )}

        <p className="mt-4 text-lg text-gray-700">
          You will be redirected shortly.
        </p>
      </div>
    </div>
  );
};

export default Thankyou;
