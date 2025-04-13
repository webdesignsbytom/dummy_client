import React, { useState, useEffect } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  CANCEL_BOOKING_API,
  CONFIRM_BOOKING_API,
  DELETE_BOOKING_API,
  DENY_BOOKING_API,
  GET_BOOKING_ADMIN_API,
} from '../../../utils/Constants';

function BookingAdminPageMainContainer() {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
  
    // Fetch all bookings on component mount
    useEffect(() => {
      client
        .get(GET_BOOKING_ADMIN_API)
        .then((res) => {
          setBookings(res.data.bookings);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Unable to retrieve booking data', err);
          setLoading(false);
        });
    }, []);
  
    // Filter bookings based on selected criteria
    const filteredBookings = bookings.filter((booking) => {
      if (filter === 'all') return true;
      if (filter === 'cancelled' && booking.cancelled) return true;
      if (filter === 'denied' && booking.denied) return true;
      if (filter === 'unconfirmed' && !booking.bookingApproved) return true;
  
      const bookingDate = new Date(booking.date);
      const today = new Date();
  
      // Filter by day
      if (filter === 'day' && bookingDate.toDateString() === today.toDateString())
        return true;
  
      // Filter by week
      if (filter === 'week' && isSameWeek(bookingDate, today)) return true;
  
      // Filter by month
      if (
        filter === 'month' &&
        bookingDate.getMonth() === today.getMonth() &&
        bookingDate.getFullYear() === today.getFullYear()
      )
        return true;
  
      return false;
    });
  
    // Check if two dates are in the same week
    const isSameWeek = (date1, date2) => {
      const startOfWeek = new Date(date2);
      startOfWeek.setDate(date2.getDate() - date2.getDay());
      const endOfWeek = new Date(date2);
      endOfWeek.setDate(date2.getDate() + (6 - date2.getDay()));
  
      return date1 >= startOfWeek && date1 <= endOfWeek;
    };
  
    // Handle filter change
    const handleFilterChange = (event) => {
      setFilter(event.target.value);
    };
  
    // Confirm a booking
    const confirmBooking = async (bookingId) => {
      client
        .get(`${CONFIRM_BOOKING_API}/${bookingId}`)
        .then((res) => {
          console.log(res.data.bookings);
          setBookings(
            bookings.map((booking) =>
              booking.id === bookingId
                ? { ...booking, bookingApproved: true }
                : booking
            )
          );
        })
        .catch((err) => {
          console.error('Unable to retrieve booking data', err);
        });
    };
  
    // Deny a booking
    const denyBooking = async (bookingId) => {
      client
        .get(`${DENY_BOOKING_API}/${bookingId}`)
        .then((res) => {
          console.log(res.data.bookings);
          setBookings(
            bookings.map((booking) =>
              booking.id === bookingId ? { ...booking, denied: true } : booking
            )
          );
        })
        .catch((err) => {
          console.error('Unable to retrieve booking data', err);
        });
    };
  
    // Cancel a booking
    const cancelBooking = async (bookingId) => {
      client
        .get(`${CANCEL_BOOKING_API}/${bookingId}`)
        .then((res) => {
          console.log(res.data.bookings);
          setBookings(bookings.filter((booking) => booking.id !== bookingId));
        })
        .catch((err) => {
          console.error('Unable to retrieve booking data', err);
        });
    };
  
    // Delete a booking
    const deleteBooking = async (bookingId) => {
      client
        .get(`${DELETE_BOOKING_API}/${bookingId}`)
        .then((res) => {
          console.log(res.data.bookings);
          setBookings(bookings.filter((booking) => booking.id !== bookingId));
        })
        .catch((err) => {
          console.error('Unable to retrieve booking data', err);
        });
    };
  
    // Edit a booking (could open a modal or redirect to an edit page)
    const editBooking = (bookingId) => {
      console.log('Edit booking with ID:', bookingId);
      // You could redirect to an edit page or open a modal here
    };

  return (
    <main role='main' className='grid w-full'>
      <section className='grid w-full'>
        <div className='grid w-full'>
          <div>
            <label>Filter by:</label>
            <select onChange={handleFilterChange} value={filter}>
              <option value='all'>All Bookings</option>
              <option value='day'>Today</option>
              <option value='week'>This Week</option>
              <option value='month'>This Month</option>
              <option value='cancelled'>Cancelled</option>
              <option value='denied'>Denied</option>
              <option value='unconfirmed'>Unconfirmed</option>
            </select>
          </div>

          <div>
            {filteredBookings.length === 0 ? (
              <p>No bookings found for the selected filter.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>
                        {new Date(booking.time * 1000).toLocaleTimeString()}
                      </td>
                      <td>{booking.fullName}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phoneNumber}</td>
                      <td>
                        {booking.bookingApproved
                          ? booking.cancelled
                            ? 'Cancelled'
                            : booking.denied
                            ? 'Denied'
                            : 'Confirmed'
                          : 'Unconfirmed'}
                      </td>
                      <td>
                        {!booking.bookingApproved && (
                          <button onClick={() => confirmBooking(booking.id)}>
                            Confirm
                          </button>
                        )}
                        {!booking.denied && (
                          <button onClick={() => denyBooking(booking.id)}>
                            Deny
                          </button>
                        )}
                        <button onClick={() => editBooking(booking.id)}>
                          Edit
                        </button>
                        <button onClick={() => deleteBooking(booking.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookingAdminPageMainContainer;
