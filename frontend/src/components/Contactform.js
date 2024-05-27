import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ContactForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const mode = queryParams.get('mode');
  const slotId = queryParams.get('slotId');

  useEffect(() => {
    if (slotId) {
      localStorage.setItem('slotId', slotId);
    }

    // Ensure all parameters are URL encoded
    const encodedDate = encodeURIComponent(date);
    const encodedTime = encodeURIComponent(time);
    const encodedMode = encodeURIComponent(mode);

    const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfJIfZkcaFmsV4PXoAnDvLE6v1oWdr2QJJldAeTnUAZKXcwAQ/viewform?usp=sf_link&entry.117367192=${encodedDate}&entry.377680888=${encodedTime}&entry.1251509875=${encodedMode}`;
    
    // Redirect to the Google Form
    window.location.href = googleFormUrl;
  }, [date, time, mode, slotId]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-amber-500'>
      <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
        <h2 className='my-10 font-semibold text-3xl text-gray-800'>Redirecting to Contact Form...</h2>
        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ContactForm;
