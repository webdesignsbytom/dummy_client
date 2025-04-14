import React, { useState, useEffect } from 'react';
// Api
import client from '../../api/client';
// Constants
import { GET_BOOKING_API } from '../../utils/Constants';
// Components
import BookingForm from './forms/BookingForm';
import MonthSelector from './MonthSelector';
import CalenderGrid from './CalenderGrid';

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
    phoneNumber: '',
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
      let newDate = new Date(year, month - 1, 1);
      setViewedDate(newDate);
      setDisplayMonth(newDate.toLocaleString('default', { month: 'long' }));
    }
  };

  const toggleMonthList = () => {
    setShowMonthList(!showMonthList);
  };

  const handleSelectMonth = (selectedMonthIndex) => {
    let newDate = new Date(year, selectedMonthIndex, 1);
    setViewedDate(newDate);
    setDisplayMonth(newDate.toLocaleString('default', { month: 'long' }));
    setShowMonthList(false);
  };

  const isPrevDisabled =
    year === currentDate.getFullYear() && month === currentDate.getMonth();

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    const dayOpening = openingTimes[dayName];

    if (dayOpening?.open) {
      setSelectedDay(day);
      setShowBookingTimes(true);

      setBookingForm({
        ...bookingForm,
        date: date.toISOString(),
      });
    }
  };

  const closeDaySelection = () => {
    setShowBookingTimes(false);
    setSelectedDay(null);
    setShowBookingForm(false); // Hide the booking form when closing day selection
  };
  console.log('book', bookingForm.date);
  const setTimeSelected = (time) => {
    console.log('set time');
    setShowBookingForm(true);
    setShowBookingTimes(false);
    setBookingForm({
      ...bookingForm,
      time: time,
    });
  };

  return (
    <main role='main' className='grid w-full'>
      {/* Booking grid */}
      <section className='grid w-full'>
        {/* Calendar container */}
        <div className='grid w-full px-8 lg:container lg:mx-auto'>
          <div className='grid w-fit mx-auto'>
            {/* Calendar Heading */}
            <MonthSelector
              handlePrevMonth={handlePrevMonth}
              isPrevDisabled={isPrevDisabled}
              previousMonth={previousMonth}
              toggleMonthList={toggleMonthList}
              displayMonth={displayMonth}
              year={year}
              showMonthList={showMonthList}
              handleSelectMonth={handleSelectMonth}
              handleNextMonth={handleNextMonth}
              month={month}
              nextMonth={nextMonth}
            />

            {/* Calendar Grid */}
            <CalenderGrid
              showBookingTimes={showBookingTimes}
              selectedDay={selectedDay}
              calendarDays={calendarDays}
              year={year}
              month={month}
              openingTimes={openingTimes}
              handleDayClick={handleDayClick}
              closeDaySelection={closeDaySelection}
              setTimeSelected={setTimeSelected}
            />
          </div>

          {/* Booking form */}
          {showBookingForm && (
            <BookingForm
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default BookingPageMainContainer;
