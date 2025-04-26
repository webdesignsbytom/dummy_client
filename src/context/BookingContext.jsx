import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import {
  GET_BOOKING_DATA_API,
  SET_BOOKING_DAY_CLOSED_API,
} from '../utils/ApiRoutes';

// Create the context
export const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState([]);
  const [openingTimes, setOpeningTimes] = useState({});
  const [closedDays, setClosedDays] = useState([]);
  const [isSettingDayClosed, setIsSettingDayClosed] = useState([]);

  useEffect(() => {
    client
      .get(GET_BOOKING_DATA_API, false)
      .then((res) => {
        const data = res.data.data;
        setBookingData(data.bookings);
        setOpeningTimes(data.openingTimes);
        setClosedDays(data.closedDays);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
      });
  }, []);

  const setDayToClosed = (date, reason) => {
    setIsSettingDayClosed(true);
    
    const data = {
      date: date,
      reason: reason,
    };

    client
      .post(SET_BOOKING_DAY_CLOSED_API, data, false)
      .then((res) => {
        setIsSettingDayClosed(false);
      })
      .catch((err) => {
        setIsSettingDayClosed(false);
        console.error('Unable to set day closed', err);
      });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        openingTimes,
        closedDays,
        setBookingData,
        setOpeningTimes,
        setClosedDays,
        setDayToClosed,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingProvider;
