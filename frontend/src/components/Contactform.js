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
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-center my-10 font-semibold text-3xl'>Redirecting to Contact Form...</h2>
    </div>
  );
};

export default ContactForm;
