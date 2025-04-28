import React, { useState, useEffect } from 'react';
// Utils
import LoadingSpinner from '../utils/LoadingSpinner';
// Data
import { bookingOpeningTimes } from '../../utils/data/BookingData';
// Context
import { useBooking } from '../../context/BookingContext';
// Components
import BookingForm from './forms/BookingForm';
import MonthSelector from './MonthSelector';
import CalenderGrid from './CalenderGrid';
import BookingRequestConfirmed from './BookingRequestConfirmed';
import BookingRequestFailed from './BookingRequestFailed';
import BookingRequestUnavailable from './BookingRequestUnavailable';

function BookingPageMainContainer() {
  const { bookingData } = useBooking();

  console.log('bookings', bookingData);

  const [currentDate] = useState(new Date());
  console.log('currentDate', currentDate);
  const [viewedDate, setViewedDate] = useState(new Date());
  console.log('viewedDate', viewedDate);
  const [displayMonth, setDisplayMonth] = useState(
    viewedDate.toLocaleString('default', { month: 'long' })
  );
  const [selectedDate, setSelectedDate] = useState();

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
    setSelectedDate(date);
    console.log('XX date', date);
    const dayIndex = date.getDay(); // Sunday = 0
    const correctedDayIndex = dayIndex === 0 ? 7 : dayIndex; // Convert Sunday (0) to 7
    const dayOpening = bookingOpeningTimes[correctedDayIndex];

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
                selectedDate={selectedDate}
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
