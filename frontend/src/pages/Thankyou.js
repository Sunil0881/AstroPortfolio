import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate = useNavigate();
  const [slotId, setSlotId] = useState();
  const [fetchedData, setFetchedData] = useState(null);
  const urlvar = 'https://backend-astro.vercel.app';

  useEffect(() => {
    const storedSlotId = localStorage.getItem('slotId');
    setSlotId(storedSlotId);
    const data = localStorage.getItem('fetchedData');
    if (data) {
      setFetchedData(JSON.parse(data));
    }
  }, []);

  const bookSlot = async () => {
    try {
      const response = await fetch(`${urlvar}/api/slots/book/${slotId}`, {
        method: 'PUT'
      });
      if (response.ok) {
        alert("Slot Successfully Booked");
      } else if (response.status === 400) {
        alert('Slot is already booked');
      } else {
        alert('Server error. Please try again later.');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      alert('Server error. Please try again later.');
    }
  };

  useEffect(() => {
    if (slotId) {
      bookSlot();
    }
  }, [slotId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-500 to-amber-500">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-lg mx-auto relative">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4">
          Thank you for booking your slot.
        </h2>
        
        <div className="w-full flex justify-center mt-6">
          <svg className="animate-bounce w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {fetchedData ? (
          <div className="mt-4 text-lg text-gray-700">
            <p>Fetched Data:</p>
            <pre className="text-left bg-gray-100 p-4 rounded-lg overflow-auto">{JSON.stringify(fetchedData, null, 2)}</pre>
          </div>
        ) : (
          <p className="mt-4 text-lg text-gray-700">
            Loading fetched data...
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
