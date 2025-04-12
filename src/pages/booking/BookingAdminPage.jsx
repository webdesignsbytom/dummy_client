import React, { useState, useEffect } from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import axios from 'axios';

function BookingAdminPage() {
  // State to manage bookings and filters
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch all bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/get-all-bookings');
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
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
    if (filter === 'day' && bookingDate.toDateString() === today.toDateString()) return true;

    // Filter by week
    if (filter === 'week' && isSameWeek(bookingDate, today)) return true;

    // Filter by month
    if (filter === 'month' && bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() === today.getFullYear()) return true;

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
    try {
      await axios.patch(`/api/confirm-booking/${bookingId}`);
      setBookings(bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, bookingApproved: true } : booking
      ));
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  // Deny a booking
  const denyBooking = async (bookingId) => {
    try {
      await axios.patch(`/api/deny-booking/${bookingId}`);
      setBookings(bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, denied: true } : booking
      ));
    } catch (error) {
      console.error('Error denying booking:', error);
    }
  };

  // Delete a booking
  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/delete-booking/${bookingId}`);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  // Edit a booking (could open a modal or redirect to an edit page)
  const editBooking = (bookingId) => {
    console.log('Edit booking with ID:', bookingId);
    // You could redirect to an edit page or open a modal here
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h1>{CompanyName} - Booking Admin</h1>
      <div>
        <label>Filter by:</label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">All Bookings</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="cancelled">Cancelled</option>
          <option value="denied">Denied</option>
          <option value="unconfirmed">Unconfirmed</option>
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
                  <td>{new Date(booking.time * 1000).toLocaleTimeString()}</td>
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
                      <button onClick={() => confirmBooking(booking.id)}>Confirm</button>
                    )}
                    {!booking.denied && (
                      <button onClick={() => denyBooking(booking.id)}>Deny</button>
                    )}
                    <button onClick={() => editBooking(booking.id)}>Edit</button>
                    <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BookingAdminPage;
