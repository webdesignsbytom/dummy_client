import React, { useState, useEffect } from 'react';
// Api
import client from '../../api/client';
// Constants
import { GET_BOOKING_API } from '../../utils/Constants';

function BookingPageMainContainer() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch all bookings 
  useEffect(() => {
    client
      .get(GET_BOOKING_API)
      .then((res) => {
        setBookings(res.data.bookings);
      })
      .catch((err) => {
        console.error('Unable to retrieve booking data', err);
      });
  }, []);
  return <main role='main'>BookingPageMainContainer</main>;
}

export default BookingPageMainContainer;
