import React, { useState, useEffect } from 'react';
// Api
import client from '../../api/client';
// Constants
import { GET_BOOKING_API } from '../../utils/Constants';
// Icons
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from 'react-icons/hi';

function BookingPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthList, setShowMonthList] = useState(false);

  const today = new Date();

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

  // Previous/Next month labels
  const previousMonthDate = new Date(year, month - 1, 1);
  const nextMonthDate = new Date(year, month + 1, 1);

  const previousMonth = previousMonthDate.toLocaleString('default', {
    month: 'short',
  });
  const nextMonth = nextMonthDate.toLocaleString('default', { month: 'short' });

  // Handlers
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handlePrevMonth = () => {
    const isCurrentMonth =
      year === today.getFullYear() && month === today.getMonth();
    if (!isCurrentMonth) {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const toggleMonthList = () => {
    setShowMonthList(!showMonthList);
  };

  const handleSelectMonth = (selectedMonthIndex) => {
    setCurrentDate(new Date(year, selectedMonthIndex, 1));
    setShowMonthList(false);
  };

  const isPrevDisabled =
    year === today.getFullYear() && month === today.getMonth();

  return (
    <main role='main' className='grid w-full'>
      {/* Booking grid */}
      <section className='grid w-full'>
        <div className='grid w-full px-8 lg:container lg:mx-auto'>
          {/* Container */}
          <div className='grid w-fit mx-auto'>
            {/* Calendar Heading */}
            <section className='grid grid-cols-a1a gap-x-1 items-center'>
              {/* Back month */}
              <div>
                <button
                  onClick={handlePrevMonth}
                  disabled={isPrevDisabled}
                  className={`flex items-center gap-1 p-2 rounded ${
                    isPrevDisabled
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <HiOutlineChevronDoubleLeft />
                  <span>{previousMonth}</span>
                </button>
              </div>

              {/* Current Month */}
              <div className='relative text-xl font-bold my-4 text-center'>
                <button
                  onClick={toggleMonthList}
                  className='focus:outline-none'
                >
                  {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                  <span className='pl-2'>{year}</span>
                </button>

                {showMonthList && (
                  <div className='absolute left-1/2 -translate-x-1/2 mt-2 min-wz bg-white border rounded shadow grid lg:grid-cols-3 gap-2 p-2 z-10'>
                    {Array.from({ length: 12 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectMonth(i)}
                        className={`p-2 rounded hover:bg-gray-200 ${
                          i === month ? 'bg-blue-500 text-white' : ''
                        }`}
                      >
                        {new Date(year, i, 1).toLocaleString('default', {
                          month: 'short',
                        })}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Next month */}
              <div className='text-right'>
                <button
                  onClick={handleNextMonth}
                  className='flex items-center gap-1 p-2 rounded hover:bg-gray-200'
                >
                  <span>{nextMonth}</span>
                  <HiOutlineChevronDoubleRight />
                </button>
              </div>
            </section>
            {/* Calendar Grid */}
            <section>
              <div className='grid grid-cols-7 gap-2 border-t border-l w-fit mx-auto'>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div
                    key={d}
                    className='text-center font-semibold p-2 border-b border-r bg-gray-100'
                  >
                    {d}
                  </div>
                ))}

                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    className='h-16 max-h-16 max-w-20 bg-blue-400 hover:bg-blue-500 text-white border-b border-r flex items-center justify-center'
                  >
                    {day && <span>{day}</span>}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookingPageMainContainer;
