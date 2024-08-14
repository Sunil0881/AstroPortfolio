import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationIcon from "../assets/Location.png";
import MailIcon from "../assets/Email Icon.png";
import PhoneIcon from "../assets/Phone Icon.png";
import X from "../assets/x.png";
import fb from "../assets/fb.png";
import telegram from "../assets/telegram.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
    <div>
      <Navbar />
      <h2 className="my-10 font-semibold md:text-3xl text-xl text-gray-800 text-center ">Fill the below form for booking</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-4">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white  md:p-10 rounded-lg shadow-lg text-center w-full max-w-3xl">
            <form onSubmit={(e) => e.preventDefault()}>
              <iframe
                src={googleFormUrl}
                width="100%"
                height="1000"
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
        <div className="text-lg md:text-2xl text-gray-800 pt-10">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-6">Contact Address</h3>
          <div className="pt-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d994669.1952164178!2d78.89173854687499!3d13.13547300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5289b72cf8bb8f%3A0xd5fed379d9b04ecc!2sJaya%20Engineering%20College!5e0!3m2!1sen!2sin!4v1723629573650!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-gray-700 mb-6 text-base md:text-lg pt-10">
            You can receive immediate and accurate advice about your life by speaking with an expert Astrologer over the phone or via chat. You can choose an astrologer based on language, expertise in different areas, charges, and years of experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 mt-10">
            <div>
              <h3 className="font-bold text-lg mb-2">CHANDIGARH OFFICE:</h3>
              <p className="text-gray-600 text-base">
                501 2nd Floor Near Syndicate Bank, Sector 70, Sahibzada Ajit Singh Nagar Chandigarh, 160059
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">DELHI OFFICE:</h3>
              <p className="text-gray-600 text-base lg:pr-8">
                C-D Block, Shivaji Vihar, Raghubir Nagar New Delhi, Delhi, 110027
              </p>
            </div>
          </div>
          <div className="text-gray-700 mb-6 text-base md:text-lg mt-10">
            <p className="flex items-center mb-2">
              <img src={LocationIcon} alt="Location" className="mr-2" width={30} height={30} /> NYC, United States
            </p>
            <p className="flex items-center mb-2 pt-5">
              <img src={PhoneIcon} alt="Phone" className="mr-2" width={30} height={30} /> 00011222333
            </p>
            <p className="flex items-center pt-5">
              <img src={MailIcon} alt="Email" className="mr-2" width={30} height={30} /> somebody@gmail.com
            </p>
          </div>
          <div className="mt-10">
            <p className="font-bold text-lg mb-2">Social Media:</p>
            <div className="flex gap-4 pt-3">
              <img src={fb} alt="Facebook" className="mr-2" width={40} height={40} />
              <img src={telegram} alt="Telegram" className="mr-2" width={40} height={40} />
              <img src={X} alt="X (Twitter)" className="mr-2" width={40} height={40} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactForm;
