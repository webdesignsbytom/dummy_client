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
import { GrFormClose } from 'react-icons/gr';

function BookingPageMainContainer() {
  const [openingTimes, setOpeningTimes] = useState({
    Monday: { open: true, start: '09:00', end: '17:00' },
    Tuesday: { open: true, start: '09:00', end: '17:00' },
    Wednesday: { open: true, start: '09:00', end: '17:00' },
    Thursday: { open: true, start: '09:00', end: '17:00' },
    Friday: { open: true, start: '09:00', end: '17:00' },
    Saturday: { open: true, start: '10:00', end: '14:00' },
    Sunday: { open: false, start: null, end: null },
  });
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewedDate, setViewedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(
    viewedDate.toLocaleString('default', { month: 'long' })
  );

  const [showMonthList, setShowMonthList] = useState(false);
  const [showBookingTimes, setShowBookingTimes] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false); 

  const [selectedDay, setSelectedDay] = useState(null); 

  const [bookingForm, setBookingForm] = useState({
    time: '',
    date: '',
    fullName: '',
    email: '',
    phone: '',
  });

  console.log('bookings', bookings);

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
  const year = viewedDate.getFullYear();
  const month = viewedDate.getMonth();
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
    let newDate = new Date(year, month + 1, 1);
    setViewedDate(newDate);
    setDisplayMonth(newDate.toLocaleString('default', { month: 'long' }));
  };

  const handlePrevMonth = () => {
    const isCurrentMonth =
      year === currentDate.getFullYear() && month === currentDate.getMonth();
    if (!isCurrentMonth) {
      let newDate = new Date(year, month - 1, 1)
      setViewedDate(newDate);
      setDisplayMonth(newDate.toLocaleString('default', { month: 'long' }));

    }
  };

  const toggleMonthList = () => {
    setShowMonthList(!showMonthList);
  };

  const handleSelectMonth = (selectedMonthIndex) => {
    setViewedDate(new Date(year, selectedMonthIndex, 1));
    setShowMonthList(false);
  };

  const isPrevDisabled =
    year === currentDate.getFullYear() && month === currentDate.getMonth();

  const handleDayClick = (day) => {
    console.log('day', day);
    const date = new Date(year, month, day);
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    const dayOpening = openingTimes[dayName];

    if (dayOpening?.open) {
      setSelectedDay(day);
      setShowBookingTimes(true);
    }
  };

  const closeDaySelection = () => {
    setShowBookingTimes(false);
    setSelectedDay(null);
    setShowBookingForm(false); // Hide the booking form when closing day selection
  };

  const setTimeSelected = (time) => {
    console.log('set time');
    setShowBookingForm(true);
    setBookingForm({
      ...bookingForm,
      time: time,
    });
  };

  const renderAvailableTimes = () => {
    if (!selectedDay) return null;

    const selectedDate = new Date(year, month, selectedDay);
    const dayName = selectedDate.toLocaleString('default', { weekday: 'long' });
    const { start, end } = openingTimes[dayName];

    if (!start || !end) return <div>No available times for this day.</div>;

    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    const availableTimes = [];

    for (let i = startHour; i <= endHour; i++) {
      const time = `${i < 10 ? '0' + i : i}:00`;
      availableTimes.push(time);
    }

    return (
      <section className='absolute w-full bg-gray-100'>
        <div>
          <div className='grid justify-between items-center grid-flow-col py-1 bg-blue-400 px-2'>
            <div>
              <h3>Available Times:</h3>
            </div>
            <div>
              <button
                className='my-auto flex items-center'
                onClick={closeDaySelection}
              >
                <GrFormClose />
              </button>
            </div>
          </div>
          <ul>
            {availableTimes.map((time) => (
              <li
                key={time}
                onClick={() => setTimeSelected(time)}
                className='py-1 cursor-pointer hover:bg-gray-200 text-center'
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  const renderBookingForm = () => {
    if (!showBookingForm) return null;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setBookingForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // You can add logic to handle form submission, like calling an API
      console.log('Booking submitted:', bookingForm);
    };

    return (
      <section className='bg-white shadow-lg rounded-md mt-4 p-4'>
        <h3>Booking Form</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fullName'>Full Name</label>
          <input
            id='fullName'
            name='fullName'
            type='text'
            value={bookingForm.fullName}
            onChange={handleInputChange}
            placeholder='Enter your full name'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={bookingForm.email}
            onChange={handleInputChange}
            placeholder='Enter your email'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='phone'>Phone</label>
          <input
            id='phone'
            name='phone'
            type='tel'
            value={bookingForm.phone}
            onChange={handleInputChange}
            placeholder='Enter your phone number'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='date'>Select Date</label>
          <input
            id='date'
            name='date'
            type='date'
            value={bookingForm.date}
            onChange={handleInputChange}
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='time'>Select Time</label>
          <input
            id='time'
            name='time'
            type='time'
            value={bookingForm.time}
            onChange={handleInputChange}
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 mt-4 rounded'
          >
            Submit
          </button>
        </form>
      </section>
    );
  };

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
                  {displayMonth} <span className='pl-2'>{year}</span>
                </button>

                {/* Month list */}
                {showMonthList && (
                  <div className='absolute left-1/2 -translate-x-1/2 mt-2 min-w-60 bg-white border rounded shadow grid lg:grid-cols-3 gap-2 p-2 z-10'>
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
            <section className='relative'>
              {/* Time selector */}
              {showBookingTimes && renderAvailableTimes()}

              {/* Days */}
              <div className='grid grid-cols-7 gap-2 border-t border-l w-fit mx-auto'>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div
                    key={d}
                    className='text-center font-semibold p-2 border-b border-r bg-gray-100'
                  >
                    {d}
                  </div>
                ))}

                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={index} className='border-b border-r' />;
                  }

                  // Get the day of the week for this date
                  const date = new Date(year, month, day);
                  const dayName = date.toLocaleString('default', {
                    weekday: 'long',
                  });

                  // Check if this day is open
                  const isOpen = openingTimes[dayName]?.open;

                  return (
                    <button
                      key={index}
                      onClick={() => handleDayClick(day)}
                      disabled={!isOpen}
                      className={`h-16 max-h-16 max-w-20 border-b border-r flex items-center justify-center
                        ${
                          isOpen
                            ? 'bg-blue-400 hover:bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      <span>{day}</span>
                    </button>
                  );
                })}
              </div>
            </section>
            {/* Booking Form Below Calendar */}
            {renderBookingForm()}
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookingPageMainContainer;
