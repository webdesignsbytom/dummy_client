import React, { useState, useEffect } from 'react';
// Api
import client from '../../api/client';
// Constants
import { GET_BOOKING_API } from '../../utils/Constants';

function BookingPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch all bookings
  useEffect(() => {
    client
      .get(GET_BOOKING_API)
      .then((res) => {
        setBookings(res.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
        setLoading(false);
      });
  }, []);

  // Calendar details
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  // Build calendar grid array
  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <main role='main' className='grid w-full'>
      {/* Booking grid */}
      <section className='grid w-full'>
        <div className='grid w-full px-8 lg:container lg:mx-auto'>

          {/* Calendar Heading */}
          <div className='text-xl font-bold my-4'>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </div>

          {/* Calendar Grid */}
          <section>
            <div className='grid grid-cols-7 gap-2 border-t border-l w-fit mx-auto'>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div
                  key={d}
                  className='text-center font-semibold p-2 border-b border-r'
                >
                  {d}
                </div>
              ))}

              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className='h-16 max-h-16 max-w-20 bg-red-300 border-b border-r flex items-center justify-center'
                >
                  {day && <span className='text-gray-800'>{day}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default BookingPageMainContainer;
