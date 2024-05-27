import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const urlvar = 'https://astro-portfolio-beta-ten.vercel.app';

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
      setSlots(response.data);
      console.log(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
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
    <div className=" mt-6 flex justify-between space-x-32 w-full">
      <div className="p-6 bg-gray-100 border-2 rounded flex flex-col items-center shadow-lg  my-10 w-1/3">
        <h2 className="text-3xl font-bold mb-6 text-orange-500">Select a Date</h2>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            inline
            className="border-2 border-orange-500 rounded-lg"
          />
          <div>{selectedDate && format(selectedDate, 'dd-MM-yyyy')}</div>
        </div>
      </div>
      <div className=" p-6 bg-gray-100 flex flex-col border-2 rounded shadow-lg  items-center my-10 w-2/3">
        <div className=" w-full max-w-4xl">
          <h3 className="text-3xl font-bold mb-6 text-orange-500">Available Slots</h3>
          {slots.length === 0 ? (
            <div className="text-gray-600 text-lg">No appointments available</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {slots.map((slot, index) => (
                <li key={index} className="bg-white p-4 shadow rounded-lg">
                  <div>Time: {`${slot.starttime} - ${slot.endtime}`}</div>
                  <div>Mode: {slot.mode}</div>
                  <div className=' pt-2'>
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
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
