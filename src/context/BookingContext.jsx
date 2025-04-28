import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import {
  GET_BOOKING_DATA_API,
  SET_BOOKING_DAY_CLOSED_API,
  SET_BOOKING_DAY_OPEN_API,
} from '../utils/ApiRoutes';

// Create the context
export const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState([]);
  const [openingTimes, setOpeningTimes] = useState({});
  const [closedDays, setClosedDays] = useState([]);
  const [isSettingDayClosed, setIsSettingDayClosed] = useState([]);
  const [isSettingDayOpen, setIsSettingDayOpen] = useState([]);

  console.log('closedDays', closedDays);
  console.log('openingTimes', openingTimes);

  useEffect(() => {
    client
      .get(GET_BOOKING_DATA_API, false)
      .then((res) => {
        setBookingData(res.data.bookings);
        setOpeningTimes(res.data.openingTimes);
        setClosedDays(res.data.closedDays);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
      });
  }, []);

  const setDayToClosed = (date, reason) => {
    setIsSettingDayClosed(true);
    console.log(' setDayToClosed date', date);

    const data = {
      date: date,
      reason: reason,
    };

    client
      .post(SET_BOOKING_DAY_CLOSED_API, data, false)
      .then((res) => {
        // ✅ Update closedDays locally
        setClosedDays((prev) => [
          ...prev,
          { date: date.toISOString(), reason },
        ]);
        setIsSettingDayClosed(false);
      })
      .catch((err) => {
        setIsSettingDayClosed(false);
        console.error('Unable to set day closed', err);
      });
  };
  const setDayToOpen = (date) => {
    setIsSettingDayOpen(true);
  
    // Correctly format full ISO string
    const isoDate = new Date(date).toISOString();
  
    console.log('Setting day open for date:', isoDate);
  
    client
      .delete(`${SET_BOOKING_DAY_OPEN_API}/${isoDate}`, false)
      .then((res) => {
        setClosedDays((prev) =>
          prev.filter((d) => {
            const closedDate = new Date(d.date);
            closedDate.setHours(0, 0, 0, 0);
            const openingDate = new Date(date);
            openingDate.setHours(0, 0, 0, 0);
            return closedDate.getTime() !== openingDate.getTime();
          })
        );
        setIsSettingDayOpen(false);
      })
      .catch((err) => {
        setIsSettingDayOpen(false);
        console.error('Unable to set day open', err);
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
        isSettingDayClosed,
        isSettingDayOpen,
        setDayToOpen,
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
