import React, { useState, useEffect } from 'react';
// Api
import client from '../../api/client';
// Constants
import { GET_BOOKING_API } from '../../utils/Constants';
// Utils
import LoadingSpinner from '../utils/LoadingSpinner';
// Data
import { bookingOpeningTimes } from '../../utils/data/BookingData';
// Components
import BookingForm from './forms/BookingForm';
import MonthSelector from './MonthSelector';
import CalenderGrid from './CalenderGrid';
import BookingRequestConfirmed from './BookingRequestConfirmed';
import BookingRequestFailed from './BookingRequestFailed';
import BookingRequestUnavailable from './BookingRequestUnavailable';

function BookingPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  console.log('bookings', bookings);

  const [currentDate] = useState(new Date());
  const [viewedDate, setViewedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(
    viewedDate.toLocaleString('default', { month: 'long' })
  );

  const [showMonthList, setShowMonthList] = useState(false);
  const [showBookingTimes, setShowBookingTimes] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [submittingSuccesful, setSubmittingSuccesful] = useState(false);
  const [submittingFailed, setSubmittingFailed] = useState(false);
  const [bookingUnavailable, setBookingUnavailable] = useState(false);

  const [selectedDay, setSelectedDay] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    time: '',
    displayTime: '',
    date: '',
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  console.log('bookingForm', bookingForm);

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
    const date = new Date(year, month, day, 1);
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    const dayOpening = bookingOpeningTimes[dayName];

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
    setShowBookingForm(false);
  };

  const setTimeSelected = (time) => {
    setShowBookingForm(true);
    setShowBookingTimes(false);
    
    let newTime = parseInt(time.split(':')[0], 10);

    setBookingForm({
      ...bookingForm,
      time: newTime,
      displayTime: time,
    });
  };

  return (
    <main role='main' className='grid w-full py-12'>
      {/* Booking section */}
      <section className='grid w-full'>

        {/* Calendar container */}
        <div className='grid gap-y-12 w-full px-8 lg:container lg:mx-auto'>
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
            <div className='relative'>
              {loading && (
                <div className='absolute z-10 h-full w-full grid justify-center items-center'>
                  <LoadingSpinner lg={true} />
                </div>
              )}
              <CalenderGrid
                showBookingTimes={showBookingTimes}
                selectedDay={selectedDay}
                calendarDays={calendarDays}
                year={year}
                month={month}
                openingTimes={bookingOpeningTimes}
                handleDayClick={handleDayClick}
                closeDaySelection={closeDaySelection}
                setTimeSelected={setTimeSelected}
              />
            </div>
          </div>

          {/* Booking form */}
          {showBookingForm && (
            <BookingForm
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
              setShowBookingForm={setShowBookingForm}
              setSubmittingSuccesful={setSubmittingSuccesful}
              setSubmittingFailed={setSubmittingFailed}
              setBookingUnavailable={setBookingUnavailable}
            />
          )}

          {/* Success message */}
          {submittingSuccesful && <BookingRequestConfirmed />}

          {/* Failure message */}
          {submittingFailed && <BookingRequestFailed />}

          {/* Unavailable message */}
          {bookingUnavailable && (
            <BookingRequestUnavailable
              time={bookingForm.displayTime}
              date={bookingForm.date}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default BookingPageMainContainer;
