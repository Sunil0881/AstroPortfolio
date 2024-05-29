import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const mode = queryParams.get('mode');
  const slotId = queryParams.get('slotId');
  const urlvar = 'https://backend-astro.vercel.app';

  const fetchData = async () => {
    try {
      const response = await fetch(`${urlvar}/data?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&mode=${encodeURIComponent(mode)}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          localStorage.setItem('fetchedData', JSON.stringify(data));
          navigate(`/thankyou`);
        } else {
          setTimeout(fetchData, 3000); // Retry after 3 seconds if data is not found
        }
      } else {
        console.error('Error fetching data:', response.statusText);
        setTimeout(fetchData, 3000); // Retry after 3 seconds on error
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setTimeout(fetchData, 3000); // Retry after 3 seconds on error
    }
  };

  useEffect(() => {
    if (slotId) {
      localStorage.setItem('slotId', slotId);
    }
    fetchData();
  }, [slotId]);

  const encodedDate = encodeURIComponent(date);
  const encodedTime = encodeURIComponent(time);
  const encodedMode = encodeURIComponent(mode);

  const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfJIfZkcaFmsV4PXoAnDvLE6v1oWdr2QJJldAeTnUAZKXcwAQ/viewform?usp=sf_link&entry.117367192=${encodedDate}&entry.377680888=${encodedTime}&entry.1251509875=${encodedMode}`;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-amber-500'>
      <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
        <h2 className='my-10 font-semibold text-3xl text-gray-800'>Please fill out the form below</h2>
        <iframe
          src={googleFormUrl}
          width="800"
          height="400"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact Form"
          className="w-full h-screen"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default ContactForm;
