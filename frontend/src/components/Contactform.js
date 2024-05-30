import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');
  const mode = queryParams.get('mode');
  const slotId = queryParams.get('slotId');
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    if (slotId) {
      setPolling(true);
    }
  }, [slotId]);

  useEffect(() => {
    const pollForData = async () => {
      if (polling) {
        const interval = setInterval(async () => {
          try {
            const response = await fetch('https://backend-astro.vercel.app/api/latestdata');
            const result = await response.json();
            if (response.ok && result) {
              clearInterval(interval);
              handleSlotBooking(result);
            }
          } catch (error) {
            console.error('Error polling for data:', error);
          }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
      }
    };

    pollForData();
  }, [polling]);

  const handleSlotBooking = async (formData) => {
    try {
      const response = await fetch('https://backend-astro.vercel.app/api/slots/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, dataId: formData._id }), // Pass the dataId here
      });
  
      const result = await response.json();
  
      if (result.message === 'Slot booked successfully') {
        const data = {
          ...formData,
          isSubmitted: true,
        };
  
        const sendDataResponse = await fetch('https://backend-astro.vercel.app/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        if (sendDataResponse.ok) {
          localStorage.setItem('bookingData', JSON.stringify(data));
          navigate('/thankyou');
        } else {
          console.error('Error sending data');
        }
      } else {
        alert(result.message);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
      navigate('/');
    }
  };

  const encodedDate = encodeURIComponent(date);
  const encodedTime = encodeURIComponent(time);
  const encodedMode = encodeURIComponent(mode);

  const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfJIfZkcaFmsV4PXoAnDvLE6v1oWdr2QJJldAeTnUAZKXcwAQ/viewform?usp=sf_link&entry.117367192=${encodedDate}&entry.377680888=${encodedTime}&entry.1251509875=${encodedMode}`;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-amber-500'>
      <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
        <h2 className='my-10 font-semibold text-3xl text-gray-800'>Please fill out the form below</h2>
        <form onSubmit={(e) => e.preventDefault()}>
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
        </form>
      </div>
    </div>
  );
};

export default ContactForm;