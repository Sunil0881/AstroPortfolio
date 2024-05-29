import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const urlvar = 'https://backend-astro.vercel.app';

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log(slots); // Log slots whenever it changes
  }, [slots]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchSlots = async (selectedDate) => {
    try {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
      const response = await axios.get(`${urlvar}/api/slots?date=${formattedDate}`);
      
      const fetchedSlots = Array.isArray(response.data) ? response.data : [];
      setSlots(fetchedSlots);
      console.log(fetchedSlots); // Log the fetched slots
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlots([]); // Set slots to an empty array in case of error
    }
  };

  const handleBookSlot = (slot) => {
    const timeRange = `${slot.starttime} - ${slot.endtime}`;
    const queryParams = new URLSearchParams({
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: timeRange,
      mode: slot.mode,
      slotId: slot._id
    }).toString();
    window.open(`/contactform?${queryParams}`, '_blank');
  };

  return (
    
    <div className="p-1 md:p-6  lg:py-16 bg-gray-100 w-full lg:grid lg:grid-cols-2 lg:gap-20  my-10   text-center">
      <div>
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Select a Date</h2>
      <div className="bg-white p-4 md:mx-24  lg:mx-10 xl:mx-32 shadow-lg rounded-lg">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          inline
          className="border-2 border-orange-500 rounded-lg"
        />
        <div>
          {selectedDate && format(selectedDate, 'dd-MM-yyyy')}
        </div>
      </div>
      </div>

     

      <div className="">
        <h3 className="text-2xl font-semibold pt-5 mb-4 text-center">Available Slots</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {slots.length > 0 ? (
            slots.map((slot, index) => (
              <li key={index} className="bg-white p-4 shadow rounded-lg">
                <div>Time: {`${slot.starttime} - ${slot.endtime}`}</div>
                <div>Mode: {slot.mode}</div>
                <div>
                  {slot.isBooked ? (
                    <button className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
                      Booked
                    </button>
                  ) : (
                    <button
                      className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700"
                      onClick={() => handleBookSlot(slot)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <div className=''>
              <div className="text-center text-gray-500 ">No slots available</div>
            </div>
          )}
        </ul>
      </div>

    </div>
    
  );
};

export default Calendar;
